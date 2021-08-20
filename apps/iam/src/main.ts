import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { IamModule } from "./iam.module";
import { seed } from "./iam.seed";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    IamModule.register({
      typeorm: {
        type: "postgres",
        host: "localhost",
        port: 5432,
        username: "postgres",
        password: "Admin!@#",
        database: "aod_iam",
      },
    }),
    {
      transport: Transport.RMQ,
      options: {
        urls: ["amqp://admin:admin@localhost:5672"],
        queue: "aod.iam",
      },
    },
  );
  await app.listen();

  // seed database
  await seed(app);
}

bootstrap();
