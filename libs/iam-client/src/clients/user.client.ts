import { ClientProxy } from "@nestjs/microservices";
import { LoginInput, LoginOutput } from "@iam/iam-client/models/dto/login.dto";
import { RegisterInput, RegisterOutput } from "@iam/iam-client/models/dto/register.dto";
import { ListUsersOutput } from "@iam/iam-client/models/dto/list-users.dto";
import { lastValueFrom } from "rxjs";

export class UserClient {
  constructor(
    private readonly client: ClientProxy,
  ) {
  }

  public static readonly loginPattern = "user.login";

  login(input: LoginInput): Promise<LoginOutput> {
    return lastValueFrom(
      this.client.send<LoginOutput>(UserClient.loginPattern, input),
    );
  }

  public static readonly registerPattern = "user.register";

  register(input: RegisterInput): Promise<RegisterOutput> {
    return lastValueFrom(
      this.client.send<RegisterOutput>(UserClient.registerPattern, input),
    );
  }

  public static readonly listPattern = "user.list";

  list(): Promise<ListUsersOutput> {
    return lastValueFrom(
      this.client.send<ListUsersOutput>(UserClient.listPattern, {}),
    );
  }
}
