import { Type } from 'class-transformer';
import { IsString, IsInt, IsOptional, Min, Max } from 'class-validator';

export class SearchMoviesDto {
  @IsString()
  termino: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  offset?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;
}
