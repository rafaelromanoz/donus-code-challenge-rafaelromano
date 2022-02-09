import AccountRepository from "../repositories/AccountRepository";
import { getCustomRepository, getConnection } from "typeorm";
import { createErrorMessage } from "../utils/functions";
import { UserRepository } from "../repositories/UsersRepository";
import { transferSchema } from "../schemas/schemas";

interface IDeposit {
  cpf: string;
  deposit: number;
}

interface ITransfer {
  cpfOrigin: string;
  quantity: number;
  cpfDestiny: string;
}

const depositOnAccountService = async (body: IDeposit) => {
  const { deposit, cpf } = body;
  const userRepository = getCustomRepository(UserRepository);
  const accountRepository = getCustomRepository(AccountRepository);
  const id = await verifyIfExistsUser(cpf, userRepository);
  await depositOnAccount(id, deposit, accountRepository);
  return {
    message: `Foi feito o depósito de ${deposit} para o CPF: ${cpf}`,
  };
};

const checkBodyRequest = (body: ITransfer) => {
  const { error } = transferSchema.validate(body);
  if (error) throw createErrorMessage(400, 'Dados inválidos');
}

const tranferValueAccountsService = async (body: ITransfer) => {
  checkBodyRequest(body);
  const userRepository = getCustomRepository(UserRepository);
  const { cpfOrigin, quantity, cpfDestiny } = body;
  if (quantity > 2000) throw createErrorMessage(400, 'Não é possível transferir valor maior que 2000');
  await checkValue(cpfOrigin, quantity, userRepository);
  const { idOrigin, idDestiny } = await getUsersId(cpfOrigin, cpfDestiny, userRepository);
  await tranferBalanceBetweenAccounts(idOrigin, idDestiny, quantity);
  return {
    message: `Foi transferido R$ ${quantity} da conta: ${cpfOrigin} para conta: ${cpfDestiny}`
  };
};

const getUsersId = async (
  cpfOrigin: string,
  cpfDestiny: string,
  repository: UserRepository
) => {
  const { id: idOrigin } = await repository.findByCpf(cpfOrigin);
  const { id: idDestiny } = await repository.findByCpf(cpfDestiny);
  return { idOrigin, idDestiny };
};

const checkValue = async (
  cpfOrigin: string,
  quantity: number,
  repository: UserRepository
) => {
  const { account: { balance } } = await repository.findByCpf(cpfOrigin);
  if (balance - quantity < 0)
    throw createErrorMessage(400, "Você não possuí saldo disponível");
};

const tranferBalanceBetweenAccounts = async (
  idOrigin: number,
  idDestiny: number,
  quantity: number
) => {
  await getConnection().transaction(async (entityManager) => {
    await entityManager
      .getCustomRepository(AccountRepository)
      .withdrawValue(quantity, idOrigin);
    await entityManager
      .getCustomRepository(AccountRepository)
      .receiveValue(quantity, idDestiny);
  });
};

const verifyIfExistsUser = async (
  cpf: string,
  repository: UserRepository
) => {
  const existsUser = await repository.findByCpf(cpf);
  if (!existsUser)
    throw createErrorMessage(404, "Não existe usuário com esse CPF");
  return existsUser.id;
}

const depositOnAccount = async (
  id: number,
  deposit: number,
  repository: AccountRepository
) => {
  await repository.depositValue(deposit, id);
}

export {
  depositOnAccountService,
  tranferValueAccountsService,
  checkValue,
  depositOnAccount,
  getUsersId,
  checkBodyRequest,
  verifyIfExistsUser
};
