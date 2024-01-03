import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import validationMessages from 'src/constants/validationMessages';

export class CreateBrandDto {
  @ApiProperty()
  @IsString({ message: validationMessages.BRAND_TITLE_STRING_MSG })
  @IsNotEmpty({ message: validationMessages.BRAND_TITLE_EMPTY_MSG })
  @MinLength(4, { message: validationMessages.BRAND_TITLE_MIN_LENGTH_MSG })
  readonly title: string;
}
