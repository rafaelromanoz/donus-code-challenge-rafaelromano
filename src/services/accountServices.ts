import AccountRepository from "../repositories/AccountRepository";
import { getCustomRepository, getConnection } from "typeorm";
import { createErrorMessage } from "../utils/functions";
import { UserRepository } from "../repositories/UsersRepository";

interface IDeposit {
  cpf: string;
  deposit: number;
}

interface ITransfer {
  cpfOrigin: string;
  quantity: number;
  cpfDestiny: string;
}

const depositOnAccountService = async (body: IDeposit): Promise<object> => {
  const { deposit, cpf } = body;
  if (deposit > 2000)
    throw createErrorMessage(
      400,
      "Não é possível fazer depósito de mais de 2000"
    );
  const accountRepository = getCustomRepository(AccountRepository);
  const userRepository = getCustomRepository(UserRepository);
  const existsUser = await userRepository.findByCpf(cpf);
  if (!existsUser)
    throw createErrorMessage(404, "Não existe usuário com esse CPF");
  const { id } = existsUser;
  await accountRepository.depositValue(deposit, id);
  return {
    message: `Foi feito o depósito de ${deposit} para o CPF: ${cpf}`,
  };
};

const tranferValueAccountsService = async (body: ITransfer) => {
  const { cpfOrigin, quantity, cpfDestiny } = body;
  await checkValue(cpfOrigin, quantity);
  const { idOrigin, idDestiny } = await getUsersId(cpfOrigin, cpfDestiny);

  await transactionValue(idOrigin, idDestiny, quantity);

  return {};
};

const getUsersId = async (cpfOrigin: string, cpfDestiny: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const {id: idOrigin} = await userRepository.findByCpf(cpfOrigin);
  const { id: idDestiny } = await userRepository.findByCpf(cpfDestiny);
  return { idOrigin, idDestiny }
}

const checkValue = async (cpfOrigin: string, quantity: number) => {
  const userRepository = getCustomRepository(UserRepository);
  const {
    account: { balance },
  } = await userRepository.findByCpf(cpfOrigin);
  if (balance - quantity < 0) throw createErrorMessage(400, "Você não possuí saldo disponível");
};

const transactionValue = async (idOrigin: number, idDestiny: number, quantity: number) => {
  await getConnection().transaction(async entityManager => {
    await entityManager.getCustomRepository(AccountRepository).withdrawValue(quantity, idOrigin);
    await entityManager.getCustomRepository(AccountRepository).receiveValue(quantity, idDestiny);
  })
}

export { depositOnAccountService, tranferValueAccountsService };
