import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { User } from '../../user/user.entity';
import { EUserRole } from '../../user/enum/role.enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly roles: EUserRole[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    if (!this.roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    return this.matchRoles(this.roles, user);
  }

  private matchRoles(requiredRoles: EUserRole[], user: User): boolean {
    if (!user) {
      return false;
    }

    return requiredRoles.some((role) => role === user.role);
  }
}
