import { ApiProperty } from "@nestjs/swagger";
import { RoleEnum } from "../enumerations/role.enum";

export class ValidateJwtTokenInput {
  @ApiProperty({ required: true, title: "JWT token" })
  jwtToken: string;
}

export class ValidateJwtTokenOutput {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  email: string;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  role: RoleEnum;
}
