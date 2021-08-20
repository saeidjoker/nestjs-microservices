import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column({
    length: 128,
  })
  title: string;

  @Column({
    length: 1024,
  })
  description: string;
}
