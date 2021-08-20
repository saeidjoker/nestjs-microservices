import { ApiProperty } from "@nestjs/swagger";

export class LoginInput {
  @ApiProperty({ required: true, title: "E-Mail address", maxLength: 64 })
  email: string;

  @ApiProperty({ required: true, title: "Password", maxLength: 64 })
  password: string;
}

export class LoginOutput {
  @ApiProperty({ required: true, title: "JWT Token", maxLength: 64 })
  jwtToken: string;
}
