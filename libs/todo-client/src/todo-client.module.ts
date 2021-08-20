import { DynamicModule, Module } from "@nestjs/common";
import { TodoClient } from "./todo.client";
import { ClientsModule, RmqOptions } from "@nestjs/microservices";
import { TODO_CLIENT } from "@todo/todo-client/todo-client.constants";

@Module({})
export class TodoClientModule {
  static register(options: {
    rabbitMQ: RmqOptions
  }): DynamicModule {
    return {
      module: TodoClientModule,
      imports: [
        ClientsModule.register([
          {
            name: TODO_CLIENT,
            ...options.rabbitMQ,
          },
        ]),
      ],
      providers: [TodoClient],
      exports: [TodoClient],
    };
  }
}
