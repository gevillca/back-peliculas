import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcryptjs from 'bcryptjs';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { contrasena, ...rest } = createUserDto;
      const usuarioDB = this.userRepository.create({
        ...rest,
        contrasena: bcryptjs.hashSync(contrasena, 10),
      });
      await this.userRepository.save(usuarioDB);
      delete usuarioDB.contrasena;

      return {
        ...usuarioDB,
        token: this.getJWT({ usuario: usuarioDB.usuario }),
        message: 'User created successfully',
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { contrasena, usuario } = loginUserDto;
    const usuarioDB = await this.userRepository.findOne({
      where: { usuario, estado: true },
      // select: { contrasena: true, usuario: true, id: true },
    });
    if (!usuarioDB)
      throw new UnauthorizedException('Credentials are not valid');
    if (!bcryptjs.compareSync(contrasena, usuarioDB.contrasena)) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    delete usuarioDB.contrasena;
    return {
      usuario: usuarioDB,
      token: this.getJWT({ usuario: usuarioDB.usuario }),
      mensaje: 'User logged successfully',
    };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }
  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(`User already exists`);
    }
    this.logger.error(error);
    throw new BadRequestException('Something went wrong');
  }

  private getJWT(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
