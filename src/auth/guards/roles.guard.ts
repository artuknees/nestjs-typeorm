import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { ROLES_KEY } from '../decorators/roles.decorator';
import { PayloadToken } from '../models/token.model';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    if (!roles) {
      return true;
    }
    // aca voy a tener un array con los roles que pase mediante el decorador en el endpoint
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    // el user tiene rol, sub, iat y exp
    const isAuth = roles.some((el) => el === user.role);
    // verifico si el rol del usuario esta en los roles contemplados
    if (!isAuth) {
      throw new UnauthorizedException('Not authorized for this role.');
    }
    return isAuth;
  }
}
