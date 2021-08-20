import { Inject, Injectable } from "@nestjs/common";
import { TODO_CLIENT } from "@todo/todo-client/todo-client.constants";
import { ClientProxy } from "@nestjs/microservices";
import { TaskClient } from "@todo/todo-client/clients/task.client";

@Injectable()
export class TodoClient {

  public readonly task: TaskClient;

  constructor(
    @Inject(TODO_CLIENT)
    private readonly client: ClientProxy,
  ) {
    this.task = new TaskClient(client);
  }
}
