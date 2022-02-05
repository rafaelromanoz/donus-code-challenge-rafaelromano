import { UserRepository } from "../repositories/UsersRepository";
import { getCustomRepository } from "typeorm";
import userSchema from "../schemas/schemas";
import { createErrorMessage } from "../utils/functions";
interface IRequest {
  name: string;
  cpf: string;
}

const createUserService = async (body: IRequest): Promise<object> => {
  const { error } = userSchema.validate(body);
  if (error) throw createErrorMessage(400, error.message);
  const userRepository = getCustomRepository(UserRepository);
  const existsUser = await userRepository.findByCpf(body.cpf);
  if (existsUser) throw createErrorMessage(409, "Usuário já existe");
  const user = userRepository.create({ ...body });
  await userRepository.save(user);
  return {
    message:
      `Olá ${body.name} seu usuário foi cadastrado com o CPF: ${body.cpf} foi cadastrado com sucesso`,
  };
};

export {
  createUserService,
}
