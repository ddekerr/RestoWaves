import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';
import { ApiSwaggerResponse } from 'src/helpers/ApiSwaggerResponse';
import successMessages from 'src/constants/successMessages';
import { ApiResponse } from 'src/helpers/ApiResponse';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('api/categories')
export class CategoriesController {
  constructor(private categoryService: CategoriesService) {}

  // ########## CREATE NEW CATEGORY ##########
  @Post()
  @ApiSwaggerResponse(
    HttpStatus.CREATED,
    Category,
    successMessages.CATEGORY_CREATED_MSG,
  )
  async create(@Body() dto: CreateCategoryDto): Promise<ApiResponse<Category>> {
    const category = await this.categoryService.create(dto);

    return new ApiResponse(
      HttpStatus.CREATED,
      successMessages.MODEL_CREATED_MSG,
      category,
    );
  }

  // ########## UPDATE CATEGORY ##########
  @Patch(':id')
  @ApiSwaggerResponse(
    HttpStatus.OK,
    Category,
    successMessages.CATEGORY_UPDATED_MSG,
  )
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateCategoryDto,
  ): Promise<ApiResponse<Category>> {
    const category = await this.categoryService.update(id, dto);

    return new ApiResponse(
      HttpStatus.OK,
      successMessages.CATEGORY_UPDATED_MSG,
      category,
    );
  }

  // ########## DELETE CATEGORY ##########
  @Delete(':id')
  @ApiOkResponse({
    description: successMessages.CATEGORY_DELETED_MSG,
    type: ApiResponse,
  })
  @ApiParam({ name: 'id', type: Number })
  async delete(@Param('id') id: number): Promise<ApiResponse<string>> {
    await this.categoryService.delete(id);

    return new ApiResponse(HttpStatus.OK, successMessages.CATEGORY_DELETED_MSG);
  }

  // ########## GET ONE CATEGORY BY ID ##########
  @Get(':id')
  @ApiSwaggerResponse(HttpStatus.OK, Category)
  @ApiParam({ name: 'id', type: Number })
  async getOne(@Param('id') id: number): Promise<ApiResponse<Category>> {
    const category = await this.categoryService.getById(id);
    return new ApiResponse(HttpStatus.OK, '', category);
  }

  // ########## GET ALL CATEGORY ##########
  @Get()
  @ApiSwaggerResponse(HttpStatus.OK, Category)
  async getAll(): Promise<ApiResponse<Category[]>> {
    const categories = await this.categoryService.getCategoryList();
    return new ApiResponse(HttpStatus.OK, '', categories);
  }
}
