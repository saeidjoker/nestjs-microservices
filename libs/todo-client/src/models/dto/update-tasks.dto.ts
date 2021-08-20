import { ApiProperty } from "@nestjs/swagger";
import { TaskModel } from "@todo/todo-client/models/shared/task.model";

export class UpdateTaskInput {
  @ApiProperty({ required: true, title: "ID of this task", minimum: 1 })
  id: number;

  @ApiProperty({ required: true, title: "Title of the task", maxLength: 128 })
  title: string;

  @ApiProperty({ required: true, title: "A brief description", maxLength: 1024 })
  description: string;
}

export class UpdateTaskOutput {
  @ApiProperty({ required: true })
  task: TaskModel;
}
