import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../../user/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    if (!this.roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return this.matchRoles(this.roles, user);
  }

  private matchRoles(requiredRoles: string[], user: User): boolean {
    if (!user) {
      return false;
    }

    return requiredRoles.some((role) => role === user.role);
  }
}
