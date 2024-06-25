import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

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
}
