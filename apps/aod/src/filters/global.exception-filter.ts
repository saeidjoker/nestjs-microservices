import { ArgumentsHost, Catch, HttpException, HttpStatus } from "@nestjs/common";

@Catch()
export class GlobalExceptionFilter implements GlobalExceptionFilter {
  catch(exception: HttpException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status: number = exception.getResponse
                           ? (exception.getResponse().statusCode ?? exception.status)
                           : HttpStatus.INTERNAL_SERVER_ERROR;
    const error: unknown | unknown[] =
      typeof exception === "string" ? exception : (
        exception.getResponse
        ? (exception.getResponse().message ?? exception.response)
        : exception.message ?? "Unknown Error!"
      );

    // check if error belongs to a micro-service
    try {
      const json = JSON.parse(error.toString());
      response.status(status).json({
        statusCode: json.status,
        message: json.error,
      });
    } catch (e) {
    }

    response.status(status).json({
      statusCode: status,
      message: error,
    });
  }
}
