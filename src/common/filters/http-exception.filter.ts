// src/common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseDto } from '../dto /error-response.dto';
// import { NotFoundResponseDto } from '../dto /notfound-response.dto';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: ErrorResponseDto, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        // const request = ctx.getRequest<Request>();
        const isProduction = process.env.NODE_ENV === 'production';

        let status: number;
        let errorResponse = new ErrorResponseDto();

        // Handle HttpException (known errors)
        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            // 4xx Client Errors
            if (status >= 400 && status < 500) {
                // Special case for 404 Not Found
                if (status === Number(HttpStatus.NOT_FOUND)) {
                    errorResponse.statusCode = status;
                    errorResponse.message =
                        typeof exceptionResponse === 'string'
                            ? exceptionResponse
                            : (exceptionResponse as ErrorResponseDto).message || 'Resource not Found';
                }
                // Other 4xx errors
                else {
                    errorResponse = new ErrorResponseDto();
                    errorResponse.statusCode = status;
                    errorResponse.message =
                        typeof exceptionResponse === 'string'
                            ? exceptionResponse
                            : (exceptionResponse as ErrorResponseDto).message || 'Client Error';

                    if (!isProduction) {
                        errorResponse.error = exception.name;
                    }
                }
            }
            // 5xx Server Errors
            else if (status >= 500) {
                errorResponse.statusCode = status;
                errorResponse.message = isProduction
                    ? 'Something went wrong'
                    : typeof exceptionResponse === 'string'
                      ? exceptionResponse
                      : (exceptionResponse as ErrorResponseDto).message || 'Client Error';

                if (!isProduction) {
                    errorResponse.error = exception.name;
                    errorResponse.stack = exception.stack || 'No stack trace available';
                }
            }
        }
        // Handle unknown errors (treated as 500)
        else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorResponse.statusCode = status;
            errorResponse.message = 'Something went wrong';

            if (!isProduction) {
                errorResponse.error = exception.error;
                errorResponse.errors = exception.errors || exception || 'No additional error information';
                errorResponse.stack = exception.stack || 'No stack trace available';
            }
        }

        // Common fields

        response.status(status).json(errorResponse);
    }
}
