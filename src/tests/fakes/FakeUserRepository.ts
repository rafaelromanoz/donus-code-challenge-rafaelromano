import 'reflect-metadata';
import { Repository } from 'typeorm';
import User from '../../entities/User';
import { users as mockedUser } from './mockData';

export class FakeUserRepository extends Repository<User> {
  private users: User[] = [];
  public async findByCpf(cpfParam: string): Promise<User | any> {
    const user = new User();
    user.name = 'Rafael romano';
    user.id = 1;
    user.cpf = '144.788.748-78';
    this.users.push(user);
    return this.users.find(({ cpf }) => cpf === cpfParam);
  }
  public async findByName(nameParam: string): Promise<User | any> {
    return this.users.find(({ name }) => name === nameParam);
  }
}
