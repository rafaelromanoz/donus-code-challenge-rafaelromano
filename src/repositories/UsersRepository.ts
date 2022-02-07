import User from '../entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByCpf(cpf: string): Promise<User | any> {
    const user = await this.findOne({
      where: {
        cpf,
      }, relations: ["account"]
    })
    return user;
  }
  public async findByName(name: string): Promise<User | any> {
    const user = await this.findOne({
      where: {
        name
      }
    })
    return user;
  }
}
