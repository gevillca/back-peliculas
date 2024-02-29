import { TypeOrmModule } from '@nestjs/typeorm';
import { envs } from 'src/config/plugins/envs.plugin';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const CONFIG_DATABASE = () =>
  TypeOrmModule.forRoot({
    type: envs.TYPE,
    host: envs.HOST,
    port: +envs.POSTGRES_PORT,
    username: envs.POSTGRES_USER,
    password: envs.POSTGRES_PASSWORD,
    database: envs.POSTGRES_DB,
    autoLoadEntities: true,
    entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    synchronize: envs.SYNCHRONIZE,
    migrationsRun: envs.MIGRATIONS_RUN,
    namingStrategy: new SnakeNamingStrategy(),
  });
