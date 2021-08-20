import { Controller, Get } from "@nestjs/common";
import { IamClient } from "@iam/iam-client";
import { GetUserOutput } from "@iam/iam-client/models/dto/get-user.dto";
import { Observable } from "rxjs";
import { TodoClient } from "@todo/todo-client";

@Controller()
export class AppController {
  constructor(
    private readonly iamClient: IamClient,
    private readonly todoClient: TodoClient,
  ) {
  }

  @Get()
  getHello(): Observable<GetUserOutput> {
    return;
  }
}
