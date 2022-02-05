import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  
  @CreateDateColumn()
  updatedAt: Date;
}

export default User;

