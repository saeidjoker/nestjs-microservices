import { DynamicModule, Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { IamClientModule } from "@iam/iam-client";
import { RmqOptions } from "@nestjs/microservices";
import { TodoClientModule } from "@todo/todo-client";

@Module({})
export class AppModule {
  static register(options: {
    iamRabbitMQ: RmqOptions,
    todoRabbitMQ: RmqOptions
  }): DynamicModule {
    return {
      module: AppModule,
      imports: [
        IamClientModule.register({
          rabbitMQ: options.iamRabbitMQ,
        }),
        TodoClientModule.register({
          rabbitMQ: options.todoRabbitMQ,
        }),
      ],
      controllers: [AppController],
      providers: [],
    };
  }
}
