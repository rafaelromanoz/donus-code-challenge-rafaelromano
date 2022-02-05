import User from 'src/entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = this.findOne({
      where: {
        cpf,
      }
    })
    return user;
  }
}
