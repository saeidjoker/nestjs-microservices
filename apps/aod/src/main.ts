import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as helmet from "helmet";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { Transport } from "@nestjs/microservices";
import { JwtMiddleware } from "./auth/middlewares/jwt.middleware";
import { IamClient } from "@iam/iam-client";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule.register({
      iamRabbitMQ: {
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:admin@localhost:5672"],
          queue: "aod.iam",
        },
      },
      todoRabbitMQ: {
        transport: Transport.RMQ,
        options: {
          urls: ["amqp://admin:admin@localhost:5672"],
          queue: "aod.todo",
        },
      },
    }),
  );

  // Reverse Proxies need this
  // https://docs.nestjs.com/techniques/security
  app.set("trust proxy", 1);

  app.enableCors({
    allowedHeaders: "Origin, X-Requested-With, X-Language, Content-Type, Accept, Authorization",
    origin: "*",
    credentials: true,
    // expose this, because in the future, front-end guys might need
    // to read the filename of a downloading file ;)
    exposedHeaders: "Content-Disposition",
  });

  app.use(helmet());

  app.use(JwtMiddleware.getInstance(app.get(IamClient)));

  const config = new DocumentBuilder()
    .setTitle("AOD Gateway app")
    .setDescription("Description of Play app")
    .setVersion("1.0")
    .addTag("users", "USER AUTHENTICATION")
    .addTag("tasks", "TASK MANAGEMENT")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document);

  await app.listen(3000);
}

bootstrap();
