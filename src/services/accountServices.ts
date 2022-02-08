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
  const id = await verifyIfExistsUser(cpf);
  await depositOnAccount(id, deposit);
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
  const { cpfOrigin, quantity, cpfDestiny } = body;
  if (quantity > 2000) throw createErrorMessage(400, 'Não é possível transferir valor maior que 2000');
  await checkValue(cpfOrigin, quantity);
  const { idOrigin, idDestiny } = await getUsersId(cpfOrigin, cpfDestiny);
  await tranferBalanceBetweenAccounts(idOrigin, idDestiny, quantity);
  return {
    message: `Foi transferido R$ ${quantity} da conta: ${cpfOrigin} para conta: ${cpfDestiny}`
  };
};

const getUsersId = async (cpfOrigin: string, cpfDestiny: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const { id: idOrigin } = await userRepository.findByCpf(cpfOrigin);
  const { id: idDestiny } = await userRepository.findByCpf(cpfDestiny);
  return { idOrigin, idDestiny };
};

const checkValue = async (cpfOrigin: string, quantity: number) => {
  const userRepository = getCustomRepository(UserRepository);
  const { account: { balance } } = await userRepository.findByCpf(cpfOrigin);
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

const verifyIfExistsUser = async (cpf: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const existsUser = await userRepository.findByCpf(cpf);
  if (!existsUser)
    throw createErrorMessage(404, "Não existe usuário com esse CPF");
  return existsUser.id;
}

const depositOnAccount = async (id: number, deposit: number) => {
  const accountRepository = getCustomRepository(AccountRepository);
  await accountRepository.depositValue(deposit, id);
}

export { depositOnAccountService, tranferValueAccountsService };
