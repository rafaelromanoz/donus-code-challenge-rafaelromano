import Account from '../entities/Account';
import { EntityRepository, Repository, getConnection } from 'typeorm';

@EntityRepository(Account)
export default class AccountRepository extends Repository<Account | any> {
  public async findById(id: number): Promise<Account | undefined> {
    const user = await this.findOne({
      where: {
        user: id,
      }, relations: ["user"]
    })
    return user;
  }
  public async depositValue(value: number, id: number): Promise<Account | void> {
    await getConnection()
      .createQueryBuilder()
      .update(Account)
      .where("id = :id", { id })
      .set({ balance: () => 'balance + :value' })
      .setParameter("value", value)
      .execute();
  }
}
