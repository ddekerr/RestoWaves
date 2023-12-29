import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ValidationException } from 'src/exceptions/validation.exception';
import { ValidationError } from 'src/types';

@Injectable()
export class GlobalValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const err = await validate(obj);

    if (err.length) {
      //convert array of errors to ValidationError object
      const errors: ValidationError = err.reduce(
        (acc, current) => ({
          ...acc,
          [current.property]: Object.values(current.constraints),
        }),
        {},
      );

      throw new ValidationException(errors);
    }

    return value;
  }
}
