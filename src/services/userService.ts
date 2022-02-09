import { UserRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import { userSchema } from "../schemas/schemas";
import { createErrorMessage } from "../utils/functions";
import { generateToken } from "../auth/authConfig";
import AccountRepository from "../repositories/AccountRepository";
interface IRequest {
  name: string;
  cpf: string;
}

const createUserAndAccountService = async (
  body: IRequest
): Promise<object> => {
  const userRepository = getCustomRepository(UserRepository);
  const accountRepository = getCustomRepository(AccountRepository);
  const { name, cpf } = body;
  verifyBodyRequest(body);
  await verifyExistsUser(cpf, name, userRepository);
  const id = await createUser(body, userRepository);
  await createAccount(id, accountRepository);
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

const verifyExistsUser = async (
  cpf: string,
  name: string,
  repository: UserRepository
) => {
  const existsUserByCpf = await repository.findByCpf(cpf);
  const existsUserByName = await repository.findByName(name);
  if (existsUserByCpf || existsUserByName)
    throw createErrorMessage(409, "Usuário já existe");
}

const createUser = async (
  body: IRequest,
  repository: UserRepository
) => {
  const user = repository.create({ ...body });
  const { id } = await repository.save(user);
  return id;
}

const createAccount = async (
  id: number,
  repository: AccountRepository
) => {
  const createAccount = repository.create({ balance: 0, user: id });
  await repository.save(createAccount);
}

export {
  createUserAndAccountService,
  verifyExistsUser,
  verifyBodyRequest,
  createAccount,
  createUser
};
