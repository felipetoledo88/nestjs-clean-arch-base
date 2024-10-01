import { ApiProperty } from '@nestjs/swagger';
import { UserPresenter } from 'src/user/infrastructure/presenters/user.presenter';

export class LoginPresenter {
  @ApiProperty({
    description: 'Informações do usuário que realizou a autenticação',
  })
  user: UserPresenter;

  @ApiProperty({ description: 'Token de autenticação' })
  token: string;
}
