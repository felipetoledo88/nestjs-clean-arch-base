import { Injectable, Inject } from '@nestjs/common';
import { ResourceFoundError } from 'src/shared/application/errors/resource-found-error';
import { ResourceNotFoundError } from 'src/shared/application/errors/resource-not-found-error';
import { UseCase } from 'src/shared/application/usecases/use-case';
import { UserRepository } from 'src/user/domain/user.repository';
import { UserOutput } from '../output/user-output';

type Input = {
  id: number;
  login: string;
};

type Output = UserOutput;

@Injectable()
export class UpdateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRespository: UserRepository,
  ) {}

  async execute(userDto: Input): Promise<Output> {
    const user = await this.userRespository.findById(userDto.id);

    if (!user?.id)
      throw new ResourceNotFoundError(
        `User with ID '${userDto.id}' was not found`,
      );

    const userNameExists = await this.userRespository.findByUserLogin(
      userDto.login,
    );

    if (userNameExists && userNameExists.id !== user.id) {
      throw new ResourceFoundError(`User ${userDto.login} already exists`);
    }

    user.login = userDto.login;
    const createdUser = await this.userRespository.update(user);

    delete createdUser.password;

    return createdUser;
  }
}
