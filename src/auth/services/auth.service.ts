import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { User } from 'src/users/entities/user.entity';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email); // encuentro el usuario
    if (!user) {
      return null;
    }
    const isMatch = await bcrypt.compare(password, user.password); // se compara el ingresado con el encriptado
    if (isMatch) {
      return user;
    }
    return null;
  }

  generateJwt(user: User) {
    const payload: PayloadToken = { role: user.role, sub: user.id }; // sub es sub identificador
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
