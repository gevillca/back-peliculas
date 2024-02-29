import { IsString, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  usuario: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  contrasena: string;
}
