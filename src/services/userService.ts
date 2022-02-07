import { UserRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import userSchema from "../schemas/schemas";
import { createErrorMessage } from "../utils/functions";
import { generateToken } from "../auth/authConfig";
import AccountRepository from "../repositories/AccountRepository";
interface IRequest {
  name: string;
  cpf: string;
}

const createUserAndAccountService = async (body: IRequest): Promise<object> => {
  const { error } = userSchema.validate(body);
  if (error) throw createErrorMessage(400, error.message);
  const userRepository = getCustomRepository(UserRepository);
  const accountRepository = getCustomRepository(AccountRepository);
  const existsUserByCpf = await userRepository.findByCpf(body.cpf);
  const existsUserByName = await userRepository.findByName(body.name);
  if (existsUserByCpf || existsUserByName)
    throw createErrorMessage(409, "Usuário já existe");
  const user = userRepository.create({ ...body });
  const { id } = await userRepository.save(user);
  const createAccount = accountRepository.create({ balance: 0, user: id });
  await accountRepository.save(createAccount);
  const token = generateToken({ id });
  return {
    message: `Olá ${body.name} seu usuário foi cadastrado com o CPF: ${body.cpf} foi cadastrado com sucesso`,
    token,
  };
};

export { createUserAndAccountService };
