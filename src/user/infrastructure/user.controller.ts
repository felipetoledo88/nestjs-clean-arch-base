import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard } from 'src/auth/infrastructure/auth.guard';
import { CreateUserUseCase } from '../application/usecases/create-user.usecase';
import { UpdateUserUseCase } from '../application/usecases/update-user.usecase';
import { UpdateUserDto } from './dtos/update-user.dto';
import { DeleteUserUseCase } from '../application/usecases/delete-user.usecase';
import { UserPresenter } from './presenters/user.presenter';

@ApiTags('user')
@Controller('/api/user/v1')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @ApiOperation({ summary: 'Criação de um usuário' })
  @ApiResponse({
    status: 201,
    type: UserPresenter,
  })
  @ApiResponse({
    status: 400,
    description:
      'Ocorre quando o usuário já existe ou quando o tipo de usuário fornecido não é encontrado',
  })
  @ApiResponse({
    status: 422,
    description: 'Parâmetros do body inválidos',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @Post()
  createUser(@Body() createCategoryDto: CreateUserDto): Promise<UserPresenter> {
    console.log('chamou createUserss');
    return this.createUserUseCase.execute(createCategoryDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza uma usuário' })
  @ApiResponse({
    status: 200,
    type: UserPresenter,
  })
  @ApiResponse({
    status: 400,
    description:
      'Ocorre quando o usuário não é encontrado pelo ID fornecido OU a role fornecida não é encontrada OU o usuário fornecido já existe',
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
  @UseGuards(AuthGuard)
  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<UserPresenter> {
    return this.updateUserUseCase.execute(updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta um usuário' })
  @ApiResponse({
    status: 204,
    description: 'Resposta de sucesso na exclusão',
  })
  @ApiResponse({
    status: 400,
    description: 'Ocorre quando o usuário não é encontrado pelo ID fornecido',
  })
  @ApiResponse({
    status: 401,
    description: 'Acesso não autorizado',
  })
  @ApiResponse({
    status: 409,
    description:
      'Ocorre quando o usuári a ser deletado é referenciado em outras tabelas',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro desconhecido',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deleteUserUseCase.execute({ id });
  }
}
