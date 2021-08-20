import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RoleEnum } from "@iam/iam-client/models/enumerations/role.enum";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 64,
  })
  email: string;

  @Column({
    length: 64,
  })
  name: string;

  @Column()
  password: string;

  @Column({
    length: 32,
    type: "varchar",
  })
  role: RoleEnum;
}
