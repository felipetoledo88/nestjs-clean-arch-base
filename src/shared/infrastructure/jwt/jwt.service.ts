import {
  GenerateJwtToken,
  JwtService,
} from 'src/shared/application/jwt/jwt.service';
import { Users } from 'src/user/domain/user.entity';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtServiceImpl implements JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async generateJwt(user: Users): Promise<GenerateJwtToken> {
    const payload = {
      sub: user.id,
      login: user.login,
    };

    const token = await this.jwtService.signAsync(payload);

    return { token };
  }
}
