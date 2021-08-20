import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class NotFoundExceptionFilter implements ExceptionFilter {

  async catch(exception: HttpException | any, host: ArgumentsHost): Promise<any> {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status: number = exception.getResponse
                           ? (exception.getResponse().statusCode ?? exception.status)
                           : HttpStatus.INTERNAL_SERVER_ERROR;
    let error: unknown | unknown[] =
      typeof exception === "string" ? exception : (
        exception.getResponse
        ? (exception.getResponse().message ?? exception.response)
        : exception.message ?? "Unknown Error!"
      );

    // 404
    if (status === 404 && typeof error === "string") {
      error = "Resource was not found";
    }

    response.status(status).json({
      statusCode: status,
      message: error,
    });
  }
}
