import { DynamicModule, Module, Scope } from "@nestjs/common";
import { AppController } from "./endpoints/app.controller";
import { IamClientModule } from "@iam/iam-client";
import { RmqOptions } from "@nestjs/microservices";
import { TodoClientModule } from "@todo/todo-client";
import { APP_FILTER, APP_GUARD } from "@nestjs/core";
import { GlobalGuard } from "./auth/guards/global.guard";
import { GlobalExceptionFilter } from "./filters/global.exception-filter";
import { NotFoundExceptionFilter } from "./filters/not-found.exception-filter";

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
      providers: [
        // By default, all our endpoints need a JWT token unless specified with @IsPublic() meta
        {
          provide: APP_GUARD,
          useClass: GlobalGuard,
        },

        // global filter to handle exceptions
        {
          provide: APP_FILTER,
          scope: Scope.REQUEST,
          useClass: GlobalExceptionFilter,
        },

        // global filter to handle non-request exceptions like route not found 404
        {
          provide: APP_FILTER,
          useClass: NotFoundExceptionFilter,
        },
      ],
    };
  }
}
