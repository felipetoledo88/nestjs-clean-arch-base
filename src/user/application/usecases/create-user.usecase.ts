import { UserRepository } from '../../domain/user.repository';
import { Inject, Injectable } from '@nestjs/common';
import { Users } from '../../domain/user.entity';
import { UserOutput } from '../output/user-output';
import { UseCase } from 'src/shared/application/usecases/use-case';
import { Encryption } from 'src/shared/application/encryption/encryption';
import { ResourceFoundError } from 'src/shared/application/errors/resource-found-error';

type Input = {
  login: string;
  password: string;
};

type Output = UserOutput;

@Injectable()
export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRespository: UserRepository,

    @Inject('Encryption') private readonly encryption: Encryption,
  ) {}

  async execute(userDto: Input): Promise<Output> {
    const userExists = await this.userRespository.findByUserLogin(
      userDto.login,
    );

    if (userExists)
      throw new ResourceFoundError(`User '${userDto.login}' already exists`);

    const hashPassword = this.encryption.generateHash(userDto.password);

    const userEntity = new Users({
      login: userDto.login,
      password: hashPassword,
    });

    const createdUser = await this.userRespository.create(userEntity);
    delete createdUser.password;

    return createdUser;
  }
}
