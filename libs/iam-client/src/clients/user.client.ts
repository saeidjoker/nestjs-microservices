import { ClientProxy } from "@nestjs/microservices";
import { LoginInput, LoginOutput } from "@iam/iam-client/models/dto/login.dto";
import { RegisterInput, RegisterOutput } from "@iam/iam-client/models/dto/register.dto";
import { Observable } from "rxjs";

export class UserClient {
  constructor(
    private readonly client: ClientProxy,
  ) {
  }

  public static readonly loginPattern = "user.login";

  login(input: LoginInput): Observable<LoginOutput> {
    return this.client.send<LoginOutput>(UserClient.loginPattern, input)
  }

  public static readonly registerPattern = "user.register";

  register(input: RegisterInput): Observable<RegisterOutput> {
    return this.client.send<RegisterOutput>(UserClient.registerPattern, input)
  }
}
