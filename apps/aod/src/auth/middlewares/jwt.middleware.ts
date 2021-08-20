import { IamClient } from "@iam/iam-client";
import { IDENTITY_REQUEST_ITEM } from "../constants";
import { ErrorHelper } from "@shared/shared/error.helper";

export class JwtMiddleware {

  public static getInstance(iamClient: IamClient) {
    const middleware = new JwtMiddleware(iamClient);
    return middleware.run.bind(middleware);
  }

  private constructor(
    private readonly iamClient: IamClient,
  ) {
  }

  private run(request, response, next): void {
    const token = JwtMiddleware.extractToken(request);
    if (token) {
      this.iamClient.internal.validateJwtToken({
        jwtToken: token,
      }).then(output => {
        if (!output) ErrorHelper.unauthorized("Invalid credentials!");
        request[IDENTITY_REQUEST_ITEM] = output;
        next();
      });
    } else {
      next();
    }
  }

  private static extractToken(request): string {
    return request.header("AUTHORIZATION")?.substr("Bearer ".length);
  }
}
