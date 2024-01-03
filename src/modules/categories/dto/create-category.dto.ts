import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import validationMessages from 'src/constants/validationMessages';

export class CreateCategoryDto {
  @ApiProperty()
  @IsString({ message: validationMessages.CATEGORY_TITLE_STRING_MSG })
  @IsNotEmpty({ message: validationMessages.CATEGORY_TITLE_EMPTY_MSG })
  @MinLength(4, { message: validationMessages.BRAND_TITLE_MIN_LENGTH_MSG })
  title: string;

  @ApiProperty({ required: false })
  @IsNumber({}, { message: validationMessages.CATEGORY_PARENT_NUMBER_MSG })
  @Min(0, { message: validationMessages.CATEGORY_PARENT_MIN_NUMBER_MSG })
  @IsOptional()
  parentId?: number;
}
