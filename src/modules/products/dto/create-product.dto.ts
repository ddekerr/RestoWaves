import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { SIZES } from 'src/constants/fields';
import validationMessages from 'src/constants/validationMessages';

export class CreateProductDto {
  @ApiProperty()
  @IsString({ message: validationMessages.PRODUCT_TITLE_STRING_MSG })
  @IsNotEmpty({ message: validationMessages.PRODUCT_TITLE_EMPTY_MSG })
  @MinLength(4, { message: validationMessages.PRODUCT_TITLE_MIN_LENGTH_MSG })
  title: string;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.PRODUCT_CODE_NUMBER_MSG })
  @Min(0, { message: validationMessages.PRODUCT_CODE_MIN_NUMBER_MSG })
  code: number;

  @ApiProperty()
  @IsNumber({}, { message: validationMessages.PRODUCT_PRICE_NUMBER_MSG })
  @Min(0, { message: validationMessages.PRODUCT_PRICE_MIN_NUMBER_MSG })
  price: number;

  @ApiProperty()
  @IsArray({ message: validationMessages.PRODUCT_SIZES_ARRAY_MSG })
  @IsIn(SIZES, {
    message: validationMessages.PRODUCT_SIZES_ARRAY_FIT_MSG,
    each: true,
  })
  @IsOptional()
  sizes?: number[];

  @ApiProperty()
  @IsString({ message: validationMessages.BRAND_TITLE_STRING_MSG })
  @IsNotEmpty({ message: validationMessages.BRAND_TITLE_EMPTY_MSG })
  @MinLength(4, { message: validationMessages.BRAND_TITLE_MIN_LENGTH_MSG })
  @IsOptional()
  brand?: string;

  @ApiProperty()
  @IsString({ message: validationMessages.MODEL_TITLE_STRING_MSG })
  @IsNotEmpty({ message: validationMessages.MODEL_TITLE_EMPTY_MSG })
  @MinLength(4, { message: validationMessages.MODEL_TITLE_MIN_LENGTH_MSG })
  @IsOptional()
  model?: string;

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
  @IsOptional()
  categoryIds?: number[];
}
