import { BadRequestException } from '@nestjs/common';
import validationMessages from 'src/constants/validationMessages';
import { ValidationError } from 'src/types';

export class ValidationException extends BadRequestException {
  public errors: ValidationError;

  constructor(errors: ValidationError) {
    super(validationMessages.VALIDATION_ERROR);
    this.errors = errors;
  }
}
