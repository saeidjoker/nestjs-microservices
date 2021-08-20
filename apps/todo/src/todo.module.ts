import { DynamicModule, Module } from "@nestjs/common";
import { TaskController } from "./endpoints/task.controller";
import { TaskService } from "./services/task.service";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { TaskEntity } from "./entities/task.entity";
import { IamClientModule } from "@iam/iam-client";
import { RmqOptions } from "@nestjs/microservices";

const entities = [TaskEntity];

@Module({})
export class TodoModule {
  static register(options: {
    typeorm: TypeOrmModuleOptions,
    iamRabbitMQ: RmqOptions,
  }): DynamicModule {
    return {
      module: TodoModule,
      imports: [
        TypeOrmModule.forRoot({
          entities: entities,
          synchronize: true,
          ...options.typeorm,
        }),
        TypeOrmModule.forFeature(entities),
        ConfigModule.forRoot(),
        IamClientModule.register({
          rabbitMQ: options.iamRabbitMQ,
        }),
      ],
      controllers: [TaskController],
      providers: [TaskService],
    };
  }
}
