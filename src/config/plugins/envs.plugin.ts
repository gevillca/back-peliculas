import { ConfigModule, ConfigService } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: `.env`,
});

const configService = new ConfigService();

export const envs = {
  TYPE: configService.get('TYPE'),
  PORT: configService.get('PORT'),
  HOST: configService.get('HOST'),
  SYNCHRONIZE: configService.get('SYNCHRONIZE'),
  MIGRATIONS_RUN: configService.get('MIGRATIONS_RUN'),
  POSTGRES_USER: configService.get('POSTGRES_USER'),
  POSTGRES_PASSWORD: configService.get('POSTGRES_PASSWORD'),
  POSTGRES_DB: configService.get('POSTGRES_DB'),
  POSTGRES_PORT: configService.get('POSTGRES_PORT'),
  JWT_SECRET: configService.get('JWT_SECRET'),
};
