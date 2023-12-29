import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import validationMessages from 'src/constants/validationMessages';
import { ValidationException } from 'src/exceptions/validation.exception';
import { Response } from 'express';
import { ApiError } from 'src/helpers/ApiError';
import { ApiValidationError } from 'src/helpers/ApiValidationError';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // create instance of error type
    let res = null;
    if (exception instanceof ValidationException) {
      // create Validation Error
      res = new ApiValidationError(
        status,
        validationMessages.VALIDATION_ERROR,
        exception.errors,
      );
    } else {
      // create simple error
      res = new ApiError(status, exception.message);
    }

    // response error instance
    response.status(status).json(res);
  }
}
