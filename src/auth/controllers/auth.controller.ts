import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  @UseGuards(AuthGuard('local')) // le estoy diciendo que pase por la estrategia de 'local'. Va a correr el servicio y va a devolver o bien user o null
  @Post('login') // lo hago como /auth/login
  login(@Req() req: Request) {
    return req.user;
  }
}

// ejemplos
// user vilma@mail.com
// pass 26932209
