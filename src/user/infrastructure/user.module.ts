import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSchema } from './user.schema';
import { UserRepositoryImpl } from './user.repository';
import { UserController } from './user.controller';
import { CreateUserUseCase } from '../application/usecases/create-user.usecase';
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';
import { EncryptionModule } from 'src/shared/infrastructure/encryption/encryption.module';

@Module({
  imports: [TypeOrmModule.forFeature([UsersSchema]), EncryptionModule],
  controllers: [UserController],
  providers: [
    CreateUserUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryImpl,
    },
  ],
  exports: ['UserRepository'],
})
export class UserModule {}
