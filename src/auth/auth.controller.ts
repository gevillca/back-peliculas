import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './entities/user.entity';

@Controller('usuario')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-token')
  @UseGuards(AuthGuard)
  checkToken(@Request() req: Request) {
    const usuarioReq = req['usuario'] as User;

    return {
      usuario: usuarioReq,
      token: this.authService.getJWT({ usuario: usuarioReq.usuario }),
    };
  }
}
