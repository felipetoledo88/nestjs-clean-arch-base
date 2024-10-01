import { ApiProperty } from '@nestjs/swagger';

export class UserPresenter {
  @ApiProperty({ description: 'ID do usuário' })
  id: number;

  @ApiProperty({ description: 'Login do usuário' })
  login: string;
}
