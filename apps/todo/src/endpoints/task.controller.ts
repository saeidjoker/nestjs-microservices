import { Controller } from "@nestjs/common";
import { TaskService } from "../services/task.service";
import { MessagePattern } from "@nestjs/microservices";
import { TaskClient } from "@todo/todo-client/clients/task.client";
import { AddTaskInput, AddTaskOutput } from "@todo/todo-client/models/dto/add-task.dto";
import { UpdateTaskInput, UpdateTaskOutput } from "@todo/todo-client/models/dto/update-tasks.dto";
import { DeleteTaskInput } from "@todo/todo-client/models/dto/delete-task.dto";
import { ListTasksInput, ListTasksOutput } from "@todo/todo-client/models/dto/list-tasks.dto";

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {
  }

  @MessagePattern(TaskClient.addTaskPattern)
  add(input: AddTaskInput): Promise<AddTaskOutput> {
    return this.taskService.add(input);
  }

  @MessagePattern(TaskClient.updateTaskPattern)
  update(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
    return this.taskService.update(input);
  }

  @MessagePattern(TaskClient.deleteTaskPattern)
  async delete(input: DeleteTaskInput): Promise<void> {
    await this.taskService.delete(input);
  }

  @MessagePattern(TaskClient.listTasksPattern)
  list(input: ListTasksInput): Promise<ListTasksOutput> {
    return this.taskService.list(input);
  }
}
