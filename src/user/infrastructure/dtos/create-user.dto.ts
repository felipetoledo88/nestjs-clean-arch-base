import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { Regex } from 'src/shared/infrastructure/validations/regex';

export class CreateUserDto {
  @ApiProperty({
    description: 'Login usado pelo usuário para acessar o sistema.',
  })
  @IsString()
  @IsNotEmpty()
  // @Matches(Regex.regexEmail, { message: 'Invalid login' })
  readonly login: string;

  @ApiProperty({ description: 'Senha do usuário.' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
