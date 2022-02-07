import {
  Column, Entity, JoinColumn,
  OneToOne, PrimaryGeneratedColumn
} from 'typeorm';
import User from './User';

@Entity('Accounts')
export default class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('decimal')
  balance: number;

  @OneToOne(() => User, (user: User) => user.account)
  @JoinColumn()
  user: User;
}
