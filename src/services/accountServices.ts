import AccountRepository from '../repositories/AccountRepository';
import { getCustomRepository } from "typeorm";
import { createErrorMessage } from '../utils/functions';
import { UserRepository } from '../repositories/UsersRepository';

interface IBody {
  cpf: string;
  deposit: number;
}

const depositOnAccountService = async (body: IBody , id: number): Promise<object> => {
  const { deposit, cpf } = body;
  if (deposit > 2000) throw createErrorMessage(400, "Não é possível fazer depósito de mais de 2000");
  const accountRepository = getCustomRepository(AccountRepository);
  const userRepository = getCustomRepository(UserRepository);
  const existsUser = await userRepository.findByCpf(cpf);
  if (!existsUser) throw createErrorMessage(404, 'Não existe usuário com esse CPF');
  await accountRepository.depositValue(deposit, id);
  return {
    message: `Foi feito o depósito de ${deposit} para o CPF: ${cpf}`
  }
}

export {
  depositOnAccountService,
}

