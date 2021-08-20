import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Identity } from "../models/identity";
import { IDENTITY_REQUEST_ITEM } from "../constants";

export const RequestIdentity = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request[IDENTITY_REQUEST_ITEM] as Identity;
  },
);
