import { ApiProperty } from "@nestjs/swagger";
import { TaskModel } from "@todo/todo-client/models/shared/task.model";

export class ListTasksInput {
  userId: number;

  @ApiProperty({ required: true, title: "Page number (0 based)", minimum: 0 })
  page: number;

  @ApiProperty({ required: true, title: "Size of a page", minimum: 1, maximum: 1000 })
  size: number;

  @ApiProperty({ required: true, title: "A text to search in titles", maxLength: 128 })
  titleFilter?: string;
}

export class ListTasksOutput {
  @ApiProperty({ required: true, title: "List of tasks" })
  list: TaskModel[];

  @ApiProperty({ required: true, title: "Total number of tasks" })
  total: number;
}
