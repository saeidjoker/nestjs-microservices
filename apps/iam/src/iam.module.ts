import { DynamicModule, Module } from "@nestjs/common";
import { InternalController } from "./endpoints/internal.controller";
import { UserService } from "./services/user.service";
import { UserController } from "./endpoints/userController";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { IamConfig } from "./iam.config";

const entities = [UserEntity];

@Module({})
export class IamModule {
  static register(options: {
    typeorm: TypeOrmModuleOptions
  }): DynamicModule {
    return {
      module: IamModule,
      imports: [
        TypeOrmModule.forRoot({
          entities: entities,
          synchronize: true,
          ...options.typeorm,
        }),
        TypeOrmModule.forFeature(entities),
        ConfigModule.forRoot(),
        JwtModule.registerAsync({
          imports: [
            ConfigModule.forRoot(),
          ],
          inject: [
            ConfigService,
          ],
          useFactory: async (configService: ConfigService) => {
            const config = new IamConfig(configService);
            return {
              secret: config.jwtSecret,
              signOptions: {
                issuer: config.jwtIssuer,
                expiresIn: `${config.jwtMaxAgeSeconds}s`,
              },
            };
          },
        }),
      ],
      controllers: [
        InternalController,
        UserController,
      ],
      providers: [
        UserService,
        IamConfig,
      ],
    };
  }
}
