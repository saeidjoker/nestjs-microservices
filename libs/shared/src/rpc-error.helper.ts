import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

export class RpcErrorHelper {
  /**
   * Raises error 400. Use this for validation errors
   * @param error
   */
  public static badRequest(error: unknown | unknown[]): null {
    throw new CustomRpcException(HttpStatus.BAD_REQUEST, error).toRpcException();
  }

  /**
   * Raises error 404. Use this when the resource(s) are not available
   * @param error
   */
  public static notFound(error: unknown | unknown[]): null {
    throw new CustomRpcException(HttpStatus.NOT_FOUND, error).toRpcException();
  }

  /**
   * Raises error 409. Use this when you see a conflict in data integration
   * @param error
   */
  public static conflict(error: unknown | unknown[]): null {
    throw new CustomRpcException(HttpStatus.CONFLICT, error).toRpcException();
  }

  /**
   * Raises error 401. Use this only when user credentials are wrong and you suspect harm to server
   * @param error
   */
  public static unauthorized(error: unknown | unknown[]): null {
    throw new CustomRpcException(HttpStatus.UNAUTHORIZED, error).toRpcException();
  }

  /**
   * Raises error 403. Use this in guards
   * @param error
   */
  public static forbidden(error: unknown | unknown[]): null {
    throw new CustomRpcException(HttpStatus.FORBIDDEN, error).toRpcException();
  }

  /**
   * Raises a not implemented exception
   * @param error
   */
  public static notImplemented(error: unknown | unknown[]): null {
    throw new CustomRpcException(HttpStatus.NOT_IMPLEMENTED, error).toRpcException();
  }
}


class CustomRpcException {
  constructor(
    private readonly status: HttpStatus,
    private readonly error: unknown | unknown[],
  ) {
  }

  public toRpcException(): RpcException {
    return new RpcException(JSON.stringify({
      status: this.status,
      error: this.error,
    }));
  }
}
