import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import validationMessages from 'src/constants/validationMessages';

export class CreateModelDto {
  @ApiProperty()
  @IsString({ message: validationMessages.MODEL_TITLE_STRING_MSG })
  @IsNotEmpty({ message: validationMessages.MODEL_TITLE_EMPTY_MSG })
  @MinLength(4, { message: validationMessages.MODEL_TITLE_MIN_LENGTH_MSG })
  title: string;
}
