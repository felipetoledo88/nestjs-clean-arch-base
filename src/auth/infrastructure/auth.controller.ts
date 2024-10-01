import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { LoginUseCase } from '../application/usecases/login.usecase';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { LoginPresenter } from './presenters/login.presenter';

@ApiTags('auth')
@Controller('/api/auth/v1')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @ApiOperation({ summary: 'Verifica se o token de autenticação é válido' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: {
        success: {
          type: 'boolean',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @UseGuards(AuthGuard)
  @Get('/verify-token')
  async verifyToken(): Promise<Record<'success', boolean>> {
    return { success: true };
  }

  @ApiOperation({ summary: 'Faz o login de um usuário' })
  @ApiResponse({
    status: 200,
    type: LoginPresenter,
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros do body inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<LoginPresenter> {
    console.log('chamou login');
    return await this.loginUseCase.execute(loginDto);
  }
}
