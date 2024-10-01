import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Regex } from 'src/shared/infrastructure/validations/regex';

export class LoginDto {
  @ApiProperty({ description: 'Login que o usuário vai usar para acessar' })
  @IsString()
  @IsNotEmpty()
  @Matches(Regex.regexEmail, { message: 'Invalid login' })
  login: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
