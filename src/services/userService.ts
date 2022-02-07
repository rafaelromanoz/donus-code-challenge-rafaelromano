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
  const { name, cpf } = body;
  verifyBodyRequest(body);
  await verifyUsersExists(cpf, name);
  const id = await createUser(body);
  await createAccount(body, id);
  const token = generateToken({ id });
  return {
    message: `Olá ${body.name} seu usuário foi cadastrado com o CPF: ${body.cpf} foi cadastrado com sucesso`,
    token,
  };
};

const verifyBodyRequest = (body: IRequest) => {
  const { error } = userSchema.validate(body);
  if (error) throw createErrorMessage(400, error.message);
}

const verifyUsersExists = async (cpf: string, name: string) => {
  const userRepository = getCustomRepository(UserRepository);
  const existsUserByCpf = await userRepository.findByCpf(cpf);
  const existsUserByName = await userRepository.findByName(name);
  if (existsUserByCpf || existsUserByName)
    throw createErrorMessage(409, "Usuário já existe");
}

const createUser = async (body: IRequest) => {
  const userRepository = getCustomRepository(UserRepository);
  const user = userRepository.create({ ...body });
  const { id } = await userRepository.save(user);
  return id;
}

const createAccount = async (body: IRequest, id: number) => {
  const accountRepository = getCustomRepository(AccountRepository);
  const createAccount = accountRepository.create({ balance: 0, user: id });
  await accountRepository.save(createAccount);
}

export { createUserAndAccountService };
