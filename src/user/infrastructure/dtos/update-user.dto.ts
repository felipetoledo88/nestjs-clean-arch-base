import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsPositive,
  Matches,
} from 'class-validator';
import { Regex } from 'src/shared/infrastructure/validations/regex';

export class UpdateUserDto {
  @ApiProperty({
    description: 'ID do usuário',
  })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  readonly id: number;

  @ApiProperty({
    description: 'Login usado pelo usuário para acessar o sistema.',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(Regex.regexEmail, { message: 'Invalid login' })
  readonly login: string;
}
