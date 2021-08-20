import { ApiProperty } from "@nestjs/swagger";

export class TaskModel {
  @ApiProperty({ required: true, title: "ID of the task", minimum: 1 })
  id: number;

  @ApiProperty({ required: true, title: "ID of the user that this task belongs to", minimum: 1 })
  userId: number;

  @ApiProperty({ required: true, title: "Title of the task", maxLength: 128 })
  title: string;

  @ApiProperty({ required: true, title: "A brief description", maxLength: 1024 })
  description: string;
}
