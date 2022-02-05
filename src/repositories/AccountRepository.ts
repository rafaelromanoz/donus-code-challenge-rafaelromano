import Account from '../entities/Account';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account> {
  public async findByCpf(id: number): Promise<Account | undefined> {
    const user = await this.findOne({
      where: {
        id,
      }, relations: ["user"]
    })
    return user;
  }
}
