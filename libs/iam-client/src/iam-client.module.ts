import { DynamicModule, Module } from "@nestjs/common";
import { RmqOptions } from "@nestjs/microservices/interfaces/microservice-configuration.interface";
import { ClientsModule } from "@nestjs/microservices";
import { IAM_CLIENT } from "@iam/iam-client/iam-client.constants";
import { IamClient } from "@iam/iam-client/iam.client";

@Module({})
export class IamClientModule {
  static register(options: {
    rabbitMQ: RmqOptions
  }): DynamicModule {
    return {
      module: IamClientModule,
      imports: [
        ClientsModule.register([
          {
            name: IAM_CLIENT,
            ...options.rabbitMQ,
          },
        ]),
      ],
      providers: [
        IamClient,
      ],
      exports: [
        IamClient,
      ],
    };
  }
}
