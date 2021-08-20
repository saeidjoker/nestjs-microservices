import { ClientProxy } from "@nestjs/microservices";
import { GetUserInput, GetUserOutput } from "@iam/iam-client/models/dto/get-user.dto";
import {
  ValidateJwtTokenInput,
  ValidateJwtTokenOutput,
} from "@iam/iam-client/models/dto/validate-jwt-token.dto";
import { lastValueFrom } from "rxjs";

export class InternalClient {
  constructor(
    private readonly client: ClientProxy,
  ) {
  }

  public static readonly getUserPattern = "internal.get-user";

  getUser(input: GetUserInput): Promise<GetUserOutput> {
    return lastValueFrom(
      this.client.send<GetUserOutput>(InternalClient.getUserPattern, input),
    );
  }

  public static readonly validateJwtToken = "internal.validate-jwt-token";

  validateJwtToken(input: ValidateJwtTokenInput): Promise<ValidateJwtTokenOutput> {
    return lastValueFrom(
      this.client.send<GetUserOutput>(InternalClient.validateJwtToken, input),
    );
  }
}
