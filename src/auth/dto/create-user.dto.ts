import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  usuario: string;

  @IsString()
  nombres: string;

  @IsString()
  primer_apellido: string;

  @IsString()
  segundo_apellido: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  contrasena: string;
}
