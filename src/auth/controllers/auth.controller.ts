import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local')) // le estoy diciendo que pase por la estrategia de 'local'. Va a correr el servicio y va a devolver o bien user o null
  @Post('login') // lo hago como /auth/login
  login(@Req() req: Request) {
    const user = req.user as User; // el express user que es req.user, se comporta como un User
    return this.authService.generateJwt(user); // el login devuelve el usuario y el token
  }
}

// ejemplo
// user vilma@mail.com
// pass 26932209
