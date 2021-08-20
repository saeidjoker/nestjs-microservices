import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../enumerations/role.enum";

export class GetUserInput {
  @ApiProperty({ required: true, title: "User ID" })
  id: number;
}

export class GetUserOutput {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  role: RoleEnum;
}
