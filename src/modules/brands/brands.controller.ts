import {
  Body,
  Controller,
  Patch,
  Post,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { BrandsService } from './brands.service';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/helpers/ApiSwaggerResponse';
import { ApiResponse } from 'src/helpers/ApiResponse';
import successMessages from 'src/constants/successMessages';

@ApiTags('Brands')
@Controller('api/brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Post()
  @ApiSwaggerResponse(
    HttpStatus.CREATED,
    Brand,
    successMessages.BRAND_CREATED_MSG,
  )
  async create(@Body() dto: CreateBrandDto): Promise<ApiResponse<Brand>> {
    const brand = await this.brandService.createOrGet(dto);
    return new ApiResponse(
      HttpStatus.CREATED,
      successMessages.BRAND_CREATED_MSG,
      brand,
    );
  }

  @Patch(':id')
  @ApiSwaggerResponse(HttpStatus.OK, Brand, successMessages.BRAND_UPDATED_MSG)
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateBrandDto,
  ): Promise<ApiResponse<Brand>> {
    const brand = await this.brandService.update(id, dto);
    return new ApiResponse(
      HttpStatus.OK,
      successMessages.BRAND_UPDATED_MSG,
      brand,
    );
  }
}
