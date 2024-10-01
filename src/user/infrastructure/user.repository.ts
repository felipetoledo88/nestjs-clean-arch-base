import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserRepository } from '../domain/user.repository';
import { UsersSchema } from './user.schema';
import { Users } from '../domain/user.entity';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UsersSchema)
    private readonly userRepository: Repository<UsersSchema>,
  ) {}

  async findById(id: number): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    return new Users(user);
  }

  async findByUserLogin(login: string) {
    const user = await this.userRepository.findOne({
      where: { login },
    });

    return user;
  }

  async userExistsById(userId: number): Promise<boolean> {
    const userExists = await this.userRepository.existsBy({ id: userId });
    return userExists;
  }

  async create(entity: Users): Promise<Users> {
    const user = await this.userRepository.save(entity);
    return user;
  }
  async update(entity: Users): Promise<Users> {
    const user = await this.userRepository.save(entity);
    return user;
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
