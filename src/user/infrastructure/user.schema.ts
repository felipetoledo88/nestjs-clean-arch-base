import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UsersSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column({ length: 65 })
  password: string;
}
