import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvConfigModule } from '../env-config/env-config.module';
import { EnvConfigServiceImpl } from '../env-config/env-config.service';
import { UsersSchema } from 'src/user/infrastructure/user.schema';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [EnvConfigModule],
      useFactory: async (configService: EnvConfigServiceImpl) => ({
        type: 'mysql',
        host: configService.getDbHost(),
        port: configService.getDbPort(),
        username: configService.getDbUsername(),
        password: configService.getDbPassword(),
        database: configService.getDbName(),
        // Passar todos os schemas aqui
        entities: [UsersSchema],

        // Coloque true caso queira modificar o banco automaticamente ao alterar as entities (cuidado com essa opção)
        synchronize: true,
      }),
      inject: [EnvConfigServiceImpl],
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
