import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      // puedo customizar el naming de los atributos
      usernameField: 'email',
      passwordField: 'password',
    }); // cuando hago una herencia pido super y traigo al constructor de la clase de donde estoy herendando
  }

  async validate(email: string, password: string) {
    // uso el servicio de auth
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      // si fallo el login
      throw new UnauthorizedException('Failed login');
    }
    return user;
  }
}
