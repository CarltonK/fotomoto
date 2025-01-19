import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger as WinstonLogger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private ctx = { context: AllExceptionsFilter.name };

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger,
  ) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const { message, status } = this.getErrorMessage(exception);

    const method = request.method;
    const path = request.url;
    const stack =
      process.env.NODE_ENV === 'local'
        ? exception.stack?.toString().replace(/\n/g, '') ||
          'No stack trace available'
        : undefined;
    const name = exception.name;

    const errObject = {
      message: message['message'] || message,
      path,
      method,
      stack,
      name,
    };
    this.logger.error(`${JSON.stringify(errObject)}`, this.ctx);

    response.status(status).json({
      status: false,
      statusCode: status,
      message,
      stack,
      timestamp: new Date().toISOString(),
    });
  }

  private getErrorMessage(exception: HttpException): {
    message: string;
    status: number;
    meta: Record<string, unknown> | string | undefined;
  } {
    const error = exception as Error;
    const errorMessage = error.message;
    this.logger.error(`Logger ${errorMessage}`, this.ctx);
    return {
      message:
        'An unexpected error occurred while processing your request. Please try again later.',
      meta: errorMessage,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }
}
