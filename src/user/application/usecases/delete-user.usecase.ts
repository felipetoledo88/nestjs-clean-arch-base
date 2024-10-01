import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../../domain/user.repository';
import { ResourceNotFoundError } from 'src/shared/application/errors/resource-not-found-error';
import { ConflictError } from 'src/shared/application/errors/conflict-error';
import { UseCase } from 'src/shared/application/usecases/use-case';

type Input = {
  id: number;
};

type Output = void;

@Injectable()
export class DeleteUserUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('UserRepository')
    private readonly userRepository: UserRepository,
  ) {}

  async execute({ id }: Input): Promise<Output> {
    const userExists = await this.userRepository.userExistsById(id);

    if (!userExists)
      throw new ResourceNotFoundError(`No user found for id ${id}`);

    try {
      await this.userRepository.deleteById(id);
    } catch (error) {
      if (error.code === 'ER_ROW_IS_REFERENCED_2')
        throw new ConflictError('User contains relations with other tables');
    }
  }
}
