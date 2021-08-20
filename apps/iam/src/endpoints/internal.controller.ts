import { Controller, Get } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { UserService } from "../services/user.service";
import { GetUserInput, GetUserOutput } from "@iam/iam-client/models/dto/get-user.dto";
import {
  ValidateJwtTokenInput,
  ValidateJwtTokenOutput,
} from "@iam/iam-client/models/dto/validate-jwt-token.dto";
import { InternalClient } from "@iam/iam-client/clients/internal.client";

@Controller()
export class InternalController {
  constructor(
    private readonly userService: UserService,
  ) {
  }

  @Get()
  async healthCheck(): Promise<string> {
    return "HEALTH: Identity and Access Management is up and running...";
  }

  @MessagePattern(InternalClient.getUserPattern)
  getUser(input: GetUserInput): Promise<GetUserOutput> {
    return this.userService.getUser(input);
  }

  @MessagePattern(InternalClient.validateJwtToken)
  validateJwtToken(input: ValidateJwtTokenInput): Promise<ValidateJwtTokenOutput> {
    return this.userService.validateJwtToken(input);
  }
}
