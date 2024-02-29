import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { CONFIG_DATABASE } from './datasource/postgres.datasource';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [CONFIG_DATABASE(), AuthModule, MoviesModule],
})
export class AppModule {}
