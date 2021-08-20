import { ClientProxy } from "@nestjs/microservices";
import { GetUserInput, GetUserOutput } from "@iam/iam-client/models/dto/get-user.dto";
import {
  ValidateJwtTokenInput,
  ValidateJwtTokenOutput,
} from "@iam/iam-client/models/dto/validate-jwt-token.dto";
import { Observable } from "rxjs";

export class InternalClient {
  constructor(
    private readonly client: ClientProxy,
  ) {
  }

  public static readonly getUserPattern = "internal.get-user";

  getUser(input: GetUserInput): Observable<GetUserOutput> {
    return this.client.send<GetUserOutput>(InternalClient.getUserPattern, input);
  }

  public static readonly validateJwtToken = "internal.validate-jwt-token";

  validateJwtToken(input: ValidateJwtTokenInput): Observable<ValidateJwtTokenOutput> {
    return this.client.send<GetUserOutput>(InternalClient.validateJwtToken, input);
  }
}
