import { ClientProxy } from "@nestjs/microservices";
import { AddTaskInput, AddTaskOutput } from "@todo/todo-client/models/dto/add-task.dto";
import { Observable } from "rxjs";
import { UpdateTaskInput, UpdateTaskOutput } from "@todo/todo-client/models/dto/update-tasks.dto";
import { DeleteTaskInput } from "@todo/todo-client/models/dto/delete-task.dto";
import { ListTasksInput, ListTasksOutput } from "@todo/todo-client/models/dto/list-task.dto";

export class TaskClient {
  constructor(
    private readonly client: ClientProxy,
  ) {
  }

  public static readonly addTaskPattern = "task.add";

  add(input: AddTaskInput): Observable<AddTaskOutput> {
    return this.client.send<AddTaskOutput>(TaskClient.addTaskPattern, input);
  }

  public static readonly updateTaskPattern = "task.update";

  update(input: UpdateTaskInput): Observable<UpdateTaskOutput> {
    return this.client.send<UpdateTaskOutput>(TaskClient.updateTaskPattern, input);
  }

  public static readonly deleteTaskPattern = "task.delete";

  delete(input: DeleteTaskInput): void {
    this.client.send<AddTaskOutput>(TaskClient.deleteTaskPattern, input);
  }

  public static readonly listTasksPattern = "task.list";

  list(input: ListTasksInput): Observable<ListTasksOutput> {
    return this.client.send<ListTasksOutput>(TaskClient.listTasksPattern, input);
  }
}
