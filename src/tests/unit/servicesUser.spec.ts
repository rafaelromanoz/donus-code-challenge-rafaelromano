import { body, errorBody } from "../fakes/mockData";
import * as functionServices from "../../services/userService";
import { UserRepository } from "../../repositories/UsersRepository";
import User from "../../entities/User";
import AccountRepository from "../../repositories/AccountRepository";
import Account from "../../entities/Account";

describe("Testando services do User", () => {
  it("Verifica se existe o usuário passando dados corretos", async () => {
    expect(functionServices.verifyBodyRequest(body)).toBe(undefined);
  });
  it("Verifica se retorna erro ao passar body errado", () => {
    try {
      expect(functionServices.verifyBodyRequest(errorBody)).toBeCalled();
    } catch (error) {
      expect(error).toStrictEqual({ errorCode: 400, message: "CPF inválido" });
    }
  });
  it("Verifica se existe usuário", async () => {
    try {
      const user = new User();

      user.cpf = "144.788.748-78";
      user.id = 1;
      user.name = "Rafael romano";

      const getCustomRepository = jest.fn().mockResolvedValue(UserRepository);

      const fakeRepository = getCustomRepository(UserRepository);
      fakeRepository.findByCpf = jest.fn().mockResolvedValue(user);
      fakeRepository.findByName = jest.fn().mockResolvedValue(user);
      expect(
        await functionServices.verifyExistsUser(
          "144.788.748-78",
          "Rafael romano",
          fakeRepository
        )
      ).toThrow();
    } catch (error) {
      expect(error).toStrictEqual({
        errorCode: 409,
        message: "Usuário já existe",
      });
    }
  });
  it("Verifica se o usuário não existe para poder cadastrar", async () => {
    try {
      const user = new User();

      user.cpf = "144.788.748-77";
      user.id = 1;
      user.name = "Rafael romann";

      const getCustomRepository = jest.fn().mockResolvedValue(UserRepository);

      const fakeRepository = getCustomRepository(UserRepository);
      fakeRepository.findByCpf = jest.fn().mockResolvedValue(user);
      fakeRepository.findByName = jest.fn().mockResolvedValue(null);
      expect(
        await functionServices.verifyExistsUser(
          "144.788.748-78",
          "Rafael romano",
          fakeRepository
        )
      ).toBe(null);
    } catch (error) {
      expect(error).toStrictEqual({
        errorCode: 409,
        message: "Usuário já existe",
      });
    }
  });
  it("Verifica se cria uma conta com sucesso ", async () => {
    const account = new Account();

    account.balance = 600;
    account.id = 1;

    const getCustomRepository = jest.fn().mockResolvedValue(AccountRepository);

    const fakeRepository = getCustomRepository(AccountRepository);

    fakeRepository.create = jest.fn().mockResolvedValue(account);
    fakeRepository.save = jest.fn().mockResolvedValue(account);

    const result = await functionServices.createAccount(1, fakeRepository);
    expect(result).toBe(undefined);
  });

  it("Verifica se cria uma conta com sucesso ", async () => {
    const account = new Account();

    account.balance = 600;
    account.id = 1;

    const getCustomRepository = jest.fn().mockResolvedValue(AccountRepository);

    const fakeRepository = getCustomRepository(AccountRepository);

    fakeRepository.create = jest.fn().mockResolvedValue(account);
    fakeRepository.save = jest.fn().mockResolvedValue(account);

    const result = await functionServices.createAccount(1, fakeRepository);
    expect(result).toBe(undefined);
  });
  it("Verifica se cria usuário com sucesso ", async () => {
    const user = new User();

    user.cpf = "124.789.871-77";
    user.name = "Givanildo do teste";
    user.id = 1;

    const getCustomRepository = jest.fn().mockResolvedValue(UserRepository);

    const fakeRepository = getCustomRepository(UserRepository);

    fakeRepository.create = jest.fn().mockResolvedValue(1);
    fakeRepository.save = jest.fn().mockResolvedValue(user);

    const result = await functionServices.createUser(body, fakeRepository);
    expect(result).toBe(1);
  });
});
