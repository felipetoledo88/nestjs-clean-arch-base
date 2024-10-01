import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/infrastructure/user.module';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { JwtConfigModule } from 'src/shared/infrastructure/jwt/jwt.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSchema } from 'src/user/infrastructure/user.schema';
import { EncryptionModule } from 'src/shared/infrastructure/encryption/encryption.module';

@Module({
  imports: [
    UserModule,
    JwtConfigModule,
    EncryptionModule,
    TypeOrmModule.forFeature([UsersSchema]),
  ],
  controllers: [AuthController],
  providers: [LoginUseCase],
})
export class AuthModule {}
