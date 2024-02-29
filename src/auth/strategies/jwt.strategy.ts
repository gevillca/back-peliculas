import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { User } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

// todas las estrategias son providers
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // Por defecto el PassportStrategy necesita llamar el contructor del padre
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { usuario } = payload;
    const usuarioDB = await this.userRepository.findOneBy({ usuario });

    if (!usuarioDB) throw new UnauthorizedException('Token not valid');

    if (!usuarioDB.estado)
      throw new UnauthorizedException('User is inactive, talk with an admin');
    return usuarioDB;
  }
}
