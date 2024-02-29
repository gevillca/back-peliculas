import { IsString, IsUUID } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  imdbID: string;

  @IsString()
  title: string;

  @IsString()
  year: string;

  @IsString()
  poster: string;

  @IsString()
  actors: string;

  @IsString()
  director: string;

  @IsUUID('all')
  usuario_id: string;
}
