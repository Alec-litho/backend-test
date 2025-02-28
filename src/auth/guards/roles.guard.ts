import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(process.env.ROLES_KEY, [context.getHandler(), context.getClass()]);
    const user = context.switchToHttp().getRequest().user;
    console.log({ user });
    const hasRequiredRole = requiredRoles.some((role) => role === user.role);
    return hasRequiredRole;
  }
}
