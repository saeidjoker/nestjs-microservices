import { ApiProperty } from "@nestjs/swagger";
import { UserModel } from "@iam/iam-client/models/shared/user.model";

export class ListUsersOutput {
  @ApiProperty({ required: true, title: "List of users" })
  users: UserModel[];
}
