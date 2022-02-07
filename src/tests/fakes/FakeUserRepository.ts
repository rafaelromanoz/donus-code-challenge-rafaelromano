import 'reflect-metadata';
import { Repository } from 'typeorm';
import User from '../../entities/User';

export class FakeUserRepository extends Repository<User> {
  private users: User[] = [];
  public async findByCpf(cpfParam: string): Promise<User | any> {
    const user = new User();
    user.id = 1;
    user.cpf = "121.500.826.08";
    user.name = "Rafael de oliveira romano";
    this.users.push(user);
    return this.users.find(({ cpf }) => cpf === cpfParam);
  }
  public async findByName(name: string): Promise<User | any> {

  }
}
