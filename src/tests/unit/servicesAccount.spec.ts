import User from "../../entities/User";
import Account from "../../entities/Account";
import AccountRepository from "../../repositories/AccountRepository";
import * as functionsAccount from "../../services/accountServices";
import { bodyIncorrectTransfer, bodyTransfer } from "../fakes/mockData";
import { UserRepository } from "../../repositories/UsersRepository";

describe("Testando services do account", () => {
  it("Verifica se não é possível tranferir com dados incorretos ", () => {
    try {
      functionsAccount.checkBodyRequest(bodyIncorrectTransfer);
    } catch (error) {
      expect(error).toStrictEqual({
        errorCode: 400,
        message: "Dados inválidos",
      });
    }
  });
  it("Verifica  se é possível com dados corretos ", () => {
    try {
      const result = functionsAccount.checkBodyRequest(bodyTransfer);
      expect(result).toBe(undefined);
    } catch (error) {
      expect(error).toStrictEqual({
        errorCode: 400,
        message: "Dados inválidos",
      });
    }
  });
  it("Função de coletar ids", async () => {
    const getCustomRepository = jest.fn().mockResolvedValue(UserRepository);
    const user = new User();

    user.cpf = "144.788.748-78";
    user.id = 1;
    user.name = "Rafael romano";

    const fakeRepository = getCustomRepository(UserRepository);

    fakeRepository.findByCpf = jest.fn().mockResolvedValue(2);
    fakeRepository.findByCpf = jest.fn().mockResolvedValue(3);
    const result = await functionsAccount.getUsersId(
      "121.888.888-08",
      "555.999.888-55",
      fakeRepository
    );

    expect(result).toStrictEqual({
      idDestiny: result.idDestiny,
      idOrigin: result.idOrigin,
    });
  });
  it("Verifica se o usuário existe function", async () => {
    const user = new User();
    const account = new Account();

    user.cpf = "144.788.748-78";
    user.id = 1;
    user.name = "Rafael romano";
    user.account = new Account();

    account.balance = 600;

    const getCustomRepository = jest.fn().mockResolvedValue(UserRepository);

    const fakeRepository = getCustomRepository(UserRepository);

    fakeRepository.findByCpf = jest.fn().mockReturnValue(true);
    const result = await functionsAccount.verifyIfExistsUser(
      "144.788.748-78",
      fakeRepository
    );

    expect(result).toStrictEqual(undefined);
  });
  it("Verifica se o usuário não existe", async () => {
    try {
      const user = new User();
      const account = new Account();

      user.cpf = "144.788.748-78";
      user.id = 1;
      user.name = "Rafael romano";
      user.account = new Account();

      account.balance = 600;

      const getCustomRepository = jest.fn().mockResolvedValue(UserRepository);

      const fakeRepository = getCustomRepository(UserRepository);

      fakeRepository.findByCpf = jest.fn().mockReturnValue(false);
      const result = await functionsAccount.verifyIfExistsUser(
        "144.788.748-78",
        fakeRepository
      );

      expect(result).toStrictEqual(undefined);
    } catch (error) {
      expect(error).toStrictEqual({
        errorCode: 404,
        message: "Não existe usuário com esse CPF",
      });
    }
  });
  it("Verifica se é possível depositar", async () => {
    try {
      const user = new User();
      const account = new Account();

      user.cpf = "144.788.748-78";
      user.id = 1;
      user.name = "Rafael romano";
      user.account = new Account();

      account.balance = 600;

      const getCustomRepository = jest
        .fn()
        .mockResolvedValue(AccountRepository);

      const fakeRepository = getCustomRepository(AccountRepository);

      fakeRepository.depositValue = jest.fn().mockReturnValue(undefined);
      const result = await functionsAccount.depositOnAccount(
        1,
        2000,
        fakeRepository
      );

      expect(result).toStrictEqual(undefined);
    } catch (error) {
      expect(error).toStrictEqual({
        errorCode: 404,
        message: "Não existe usuário com esse CPF",
      });
    }
  });
});
