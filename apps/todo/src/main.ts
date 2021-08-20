import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { TodoModule } from "./todo.module";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TodoModule.register({
      typeorm: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "Admin!@#",
        database: "aod_todo",
      },
      iamRabbitMQ: {
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:admin@localhost:5672"],
          queue: "aod.iam",
        },
      },
    }),
    {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://admin:admin@localhost:5672"],
        queue: "aod.todo",
      },
    },
  );
  await app.listen();
}

bootstrap();
