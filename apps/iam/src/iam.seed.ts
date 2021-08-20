import { INestMicroservice } from "@nestjs/common";
import { EntityManager } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { PasswordHelper } from "./shared/helpers/password.helper";

export async function seed(app: INestMicroservice): Promise<void> {
  const entityManager = app.get(EntityManager);
  const userCount = await entityManager.count(UserEntity, {});

  if (!!userCount) return;

  await entityManager.insert(UserEntity, {
    email: "admin@admin.com",
    role: "ADMIN",
    name: "System Administrator",
    password: PasswordHelper.instance.hash("admin"),
  });
}
