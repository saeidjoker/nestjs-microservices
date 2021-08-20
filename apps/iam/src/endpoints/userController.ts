import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "../services/user.service";
import { LoginInput, LoginOutput } from "@iam/iam-client/models/dto/login.dto";
import { RegisterInput, RegisterOutput } from "@iam/iam-client/models/dto/register.dto";
import { UserClient } from "@iam/iam-client/clients/user.client";

@Controller()
export class UserController {

  constructor(
    private readonly userService: UserService,
  ) {
  }

  @MessagePattern(UserClient.loginPattern)
  login(input: LoginInput): Promise<LoginOutput> {
    return this.userService.login(input);
  }

  @MessagePattern(UserClient.registerPattern)
  register(input: RegisterInput): Promise<RegisterOutput> {
    return this.userService.register(input);
  }
}
