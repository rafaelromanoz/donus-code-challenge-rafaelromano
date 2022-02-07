import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import Account from './Account';

@Entity('Users')
class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  cpf: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne(() => Account, (account: Account) => account.user)
  account: Account;

  @CreateDateColumn()
  updatedAt: Date;
}

export default User;

