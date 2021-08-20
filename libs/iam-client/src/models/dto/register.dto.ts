import { ApiProperty } from "@nestjs/swagger";

export class RegisterInput {
  @ApiProperty({ required: true, title: "E-Mail address", maxLength: 64 })
  email: string;

  @ApiProperty({ required: true, title: "First and last name", maxLength: 64 })
  name: string;

  @ApiProperty({ required: true, title: "Password", maxLength: 64 })
  password: string;

  @ApiProperty({ required: true, title: "Confirm Password", maxLength: 64 })
  confirmPassword: string;
}

export class RegisterOutput {
  @ApiProperty({ required: true, title: "JWT Token", maxLength: 64 })
  jwtToken: string;
}
