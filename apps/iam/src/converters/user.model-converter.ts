import { UserEntity } from "../entities/user.entity";
import { UserModel } from "@iam/iam-client/models/shared/user.model";

export class UserModelConverter {
  public static convert(userEntity: UserEntity): UserModel {
    const userModel = new UserModel();
    if (!userEntity) return userModel;

    userModel.id = userEntity.id;
    userModel.email = userEntity.email;
    userModel.name = userEntity.name;
    userModel.role = userEntity.role;

    return userModel;
  }
}
