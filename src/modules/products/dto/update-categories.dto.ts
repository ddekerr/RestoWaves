import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, Min } from 'class-validator';
import validationMessages from 'src/constants/validationMessages';

export class UpdateProductCategoriesDto {
  @ApiProperty()
  @IsArray({ message: validationMessages.PRODUCT_CATEGORY_ARRAY_MSG })
  @IsNumber(
    {},
    {
      message: validationMessages.PRODUCT_CATEGORY_ARRAY_NUMBER_MSG,
      each: true,
    },
  )
  @Min(0, {
    message: validationMessages.PRODUCT_CATEGORY_ARRAY_MIN_NUMBER_MSG,
    each: true,
  })
  readonly categories: number[];
}
