import { ClientProxy } from "@nestjs/microservices";
import { AddTaskInput, AddTaskOutput } from "@todo/todo-client/models/dto/add-task.dto";
import { UpdateTaskInput, UpdateTaskOutput } from "@todo/todo-client/models/dto/update-tasks.dto";
import { DeleteTaskInput } from "@todo/todo-client/models/dto/delete-task.dto";
import { ListTasksInput, ListTasksOutput } from "@todo/todo-client/models/dto/list-tasks.dto";
import { lastValueFrom } from "rxjs";

export class TaskClient {
  constructor(
    private readonly client: ClientProxy,
  ) {
  }

  public static readonly addTaskPattern = "task.add";

  add(input: AddTaskInput): Promise<AddTaskOutput> {
    return lastValueFrom(
      this.client.send<AddTaskOutput>(TaskClient.addTaskPattern, input),
    );
  }

  public static readonly updateTaskPattern = "task.update";

  update(input: UpdateTaskInput): Promise<UpdateTaskOutput> {
    return lastValueFrom(
      this.client.send<UpdateTaskOutput>(TaskClient.updateTaskPattern, input),
    );
  }

  public static readonly deleteTaskPattern = "task.delete";

  delete(input: DeleteTaskInput): Promise<any> {
    return lastValueFrom(
      this.client.send(TaskClient.deleteTaskPattern, input),
    );
  }

  public static readonly listTasksPattern = "task.list";

  list(input: ListTasksInput): Promise<ListTasksOutput> {
    return lastValueFrom(
      this.client.send<ListTasksOutput>(TaskClient.listTasksPattern, input),
    );
  }
}
