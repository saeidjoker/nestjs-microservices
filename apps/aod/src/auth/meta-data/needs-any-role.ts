import { SetMetadata } from "@nestjs/common";
import { RoleEnum } from "@iam/iam-client/models/enumerations/role.enum";

export const NEEDS_ROLE = "NEEDS_ROLE";

export const NeedsRole = (role: RoleEnum) => SetMetadata(NEEDS_ROLE, role);
