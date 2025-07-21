import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import logger from './logger';

@Catch()
export class ErrorLoggerFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorResponse: any = {};

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = (typeof res === 'string') ? res : (res as any).message || message;
      errorResponse = res;
    } else if (exception instanceof Error) {
      message = exception.message;
      errorResponse = { message };
    }

    logger.error('Request failed', {
      timestamp: new Date().toISOString(),
      method: request.method,
      url: request.url,
      status,
      message,
      stack: (exception instanceof Error) ? exception.stack : undefined,
      body: request.body,
      query: request.query,
      params: request.params,
    });

    response.status(status).json({
      statusCode: status,
      message,
      ...(typeof errorResponse === 'object' ? errorResponse : {}),
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
} 