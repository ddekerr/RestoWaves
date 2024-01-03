import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty()
  status: number;

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty({ required: false })
  data?: T;

  constructor(status: number, message?: string, data?: T) {
    this.status = status;
    this.message = message;
    this.data = data;
  }
}
