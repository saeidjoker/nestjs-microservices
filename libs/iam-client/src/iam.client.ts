import { Inject, Injectable } from "@nestjs/common";
import { IAM_CLIENT } from "@iam/iam-client/iam-client.constants";
import { ClientProxy } from "@nestjs/microservices";
import { InternalClient } from "@iam/iam-client/clients/internal.client";
import { UserClient } from "@iam/iam-client/clients/user.client";

@Injectable()
export class IamClient {
  public readonly internal: InternalClient;
  public readonly user: UserClient;

  constructor(
    @Inject(IAM_CLIENT)
    private readonly client: ClientProxy,
  ) {
    this.internal = new InternalClient(client);
    this.user = new UserClient(client);
  }
}
