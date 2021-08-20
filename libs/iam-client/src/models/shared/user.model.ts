import { RoleEnum } from "@iam/iam-client/models/enumerations/role.enum";
import { ApiProperty } from "@nestjs/swagger";

export class UserModel {
  @ApiProperty({ required: true, title: "ID of the user", minimum: 1 })
  id: number;

  @ApiProperty({ required: true, title: "Email address of the user", maxLength: 64 })
  email: string;

  @ApiProperty({ required: true, title: "First and last name of the user", maxLength: 64 })
  name: string;

  @ApiProperty({ required: true, title: "Role of the user" })
  role: RoleEnum;
}
