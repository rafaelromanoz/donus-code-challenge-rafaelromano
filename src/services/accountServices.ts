import AccountRepository from '../repositories/AccountRepository';
import { getCustomRepository } from "typeorm"

const depositOnAccountService = async (body): Promise<object> => {
  const accountRepository = getCustomRepository(AccountRepository);
  const create = accountRepository.create({balance: 25.50, user: 1});
  const account = await accountRepository.findByCpf(1);
  console.log('🚀 ~ file: accountServices.ts ~ line 11 ~ depositOnAccountService ~ account', account);
  await accountRepository.save(create);
  return {}
}

export {
  depositOnAccountService,
}

