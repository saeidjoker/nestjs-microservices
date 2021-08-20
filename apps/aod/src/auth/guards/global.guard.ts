import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { IS_PUBLIC } from "../meta-data/is.public";
import { IDENTITY_REQUEST_ITEM } from "../constants";
import { Identity } from "../models/identity";
import { RoleEnum } from "@iam/iam-client/models/enumerations/role.enum";
import { NEEDS_ROLE } from "../meta-data/needs-any-role";

@Injectable()
export class GlobalGuard implements CanActivate {

  constructor(
    private readonly reflector: Reflector,
  ) {
  }

  private reflect<T>(context: ExecutionContext, metadataKey: string) {
    return this.reflector.getAllAndOverride<T>(metadataKey, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    // proceed if current API is public
    const isPublic = this.reflect<boolean>(context, IS_PUBLIC);

    if (isPublic) return true;

    // verify the JWT token
    const identity = request[IDENTITY_REQUEST_ITEM] as Identity;

    if (!identity) return false;

    // check if current API needs a specific role
    const neededRole = this.reflect<RoleEnum>(context, NEEDS_ROLE);
    if (!!neededRole && identity.role !== neededRole) return false;

    // just proceed if the JWT token was verified
    return !!identity;
  }
}
