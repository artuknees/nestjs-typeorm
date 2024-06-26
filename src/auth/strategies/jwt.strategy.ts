import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from '../../config';
import { ConfigType } from '@nestjs/config';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(@Inject(config.KEY) configService: ConfigType<typeof config>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false, // si le dejo esto en true, puedo mirarlo abajo como un caso y devolver una respuesta personalizada
      secretOrKey: configService.jwtSecret,
    });
  }

  validate(payload: PayloadToken) {
    // si pongo ingoreExpiration: false, no llego nunca al metodo
    // if (Date.now() / 1000 > payload.exp) {
    //   throw new UnauthorizedException('Expired JWT');
    // }
    if (payload.role !== 'admin') {
      throw new UnauthorizedException('No sos un admin');
    }
    return payload;
  }
}
