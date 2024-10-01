import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/user.repository';
import { LoginOutput } from '../output/login-output';
import { Encryption } from 'src/shared/application/encryption/encryption';
import { UseCase } from 'src/shared/application/usecases/use-case';
import { JwtService } from 'src/shared/application/jwt/jwt.service';

type Input = {
  login: string;
  password: string;
};

type Output = LoginOutput;

@Injectable()
export class LoginUseCase implements UseCase<Input, Output> {
  constructor(
    @Inject('JwtService') private readonly jwtService: JwtService,
    @Inject('UserRepository') private readonly userRepository: UserRepository,
    @Inject('Encryption') private readonly encryption: Encryption,
  ) {}

  async execute(loginRequestDto: Input): Promise<Output> {
    console.log('chamou executa');
    const user = await this.userRepository.findByUserLogin(
      loginRequestDto.login,
    );

    if (
      !user ||
      !this.encryption.compareHash(loginRequestDto.password, user.password)
    ) {
      throw new UnauthorizedException();
    }

    const { token } = await this.jwtService.generateJwt(user);

    delete user.password;

    return {
      user,
      token,
    };
  }
}
