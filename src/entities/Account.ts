import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './User';

@Entity('Accounts')
export default class Account {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column('decimal')
  balance: number;
}
