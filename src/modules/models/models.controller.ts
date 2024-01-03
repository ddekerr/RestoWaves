import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ModelsService } from './models.service';
import { Model } from './entities/model.entity';
import { CreateModelDto } from './dto/create-model.dto';
import { UpdateModelDto } from './dto/update-model.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/helpers/ApiSwaggerResponse';
import successMessages from 'src/constants/successMessages';
import { ApiResponse } from 'src/helpers/ApiResponse';

@ApiTags('Models')
@Controller('api/models')
export class ModelsController {
  constructor(private modelService: ModelsService) {}

  @Post()
  @ApiSwaggerResponse(
    HttpStatus.CREATED,
    Model,
    successMessages.MODEL_CREATED_MSG,
  )
  async create(@Body() dto: CreateModelDto): Promise<ApiResponse<Model>> {
    const model = await this.modelService.createOrGet(dto);
    return new ApiResponse(
      HttpStatus.CREATED,
      successMessages.MODEL_CREATED_MSG,
      model,
    );
  }

  @Patch(':id')
  @ApiSwaggerResponse(HttpStatus.OK, Model, successMessages.MODEL_UPDATED_MSG)
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateModelDto,
  ): Promise<ApiResponse<Model>> {
    const model = await this.modelService.update(id, dto);
    return new ApiResponse(
      HttpStatus.OK,
      successMessages.MODEL_UPDATED_MSG,
      model,
    );
  }
}
