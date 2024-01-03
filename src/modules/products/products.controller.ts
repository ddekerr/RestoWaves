import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Query,
  Patch,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Params } from './types';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiSwaggerResponse } from 'src/helpers/ApiSwaggerResponse';
import successMessages from 'src/constants/successMessages';
import { ApiResponse } from 'src/helpers/ApiResponse';
import { UpdateProductBrandDto } from './dto/update-brand.dto';
import { UpdateProductModelDto } from './dto/update-model.dto';
import { UpdateProductCategoriesDto } from './dto/update-categories.dto';

@ApiTags('Products')
@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // ########## CREATE NEW PRODUCT ##########
  @Post()
  @ApiSwaggerResponse(
    HttpStatus.CREATED,
    Product,
    successMessages.PRODUCT_CREATED_MSG,
  )
  async create(@Body() dto: CreateProductDto): Promise<ApiResponse<Product>> {
    const product = await this.productService.create(dto);

    return new ApiResponse(
      HttpStatus.CREATED,
      successMessages.PRODUCT_CREATED_MSG,
      product,
    );
  }

  // ########## UPDATE PRODUCT ##########
  @Patch(':id')
  @ApiSwaggerResponse(
    HttpStatus.OK,
    Product,
    successMessages.PRODUCT_UPDATED_MSG,
  )
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateProductDto,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.update(id, dto);

    return new ApiResponse(
      HttpStatus.CREATED,
      successMessages.MODEL_CREATED_MSG,
      product,
    );
  }

  // ########## UPDATE PRODUCT BRAND ##########
  @Patch(':id/brand')
  @ApiSwaggerResponse(
    HttpStatus.OK,
    Product,
    successMessages.PRODUCT_UPDATED_BRAND_MSG,
  )
  @ApiParam({ name: 'id', type: Number })
  async updateBrand(
    @Param('id') id: number,
    @Body() dto: UpdateProductBrandDto,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.updateBrand(id, dto);

    return new ApiResponse(
      HttpStatus.OK,
      successMessages.PRODUCT_UPDATED_BRAND_MSG,
      product,
    );
  }

  // ########## UPDATE PRODUCT MODEL ##########
  @Patch(':id/model')
  @ApiSwaggerResponse(
    HttpStatus.OK,
    Product,
    successMessages.PRODUCT_UPDATED_MODEL_MSG,
  )
  @ApiParam({ name: 'id', type: Number })
  async updateModel(
    @Param('id') id: number,
    @Body() dto: UpdateProductModelDto,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.updateModel(id, dto);

    return new ApiResponse(
      HttpStatus.OK,
      successMessages.PRODUCT_UPDATED_MODEL_MSG,
      product,
    );
  }

  // ########## UPDATE PRODUCT CATEGORIES ##########
  @Patch(':id/categories')
  @Patch(':id/model')
  @ApiSwaggerResponse(
    HttpStatus.OK,
    Product,
    successMessages.PRODUCT_UPDATED_CATEGORIES_MSG,
  )
  @ApiParam({ name: 'id', type: Number })
  async updateCategories(
    @Param('id') id: number,
    @Body() dto: UpdateProductCategoriesDto,
  ): Promise<ApiResponse<Product>> {
    const product = await this.productService.updateCategories(id, dto);

    return new ApiResponse(
      HttpStatus.OK,
      successMessages.PRODUCT_UPDATED_CATEGORIES_MSG,
      product,
    );
  }

  // ########## GET ONE PRODUCT BY ID ##########
  @Get(':id')
  @ApiSwaggerResponse(HttpStatus.OK, Product)
  @ApiParam({ name: 'id', type: Number })
  async getOne(@Param('id') id: number): Promise<ApiResponse<Product>> {
    const product = await this.productService.getOneById(id);

    return new ApiResponse(HttpStatus.OK, '', product);
  }

  // ########## GET PRODUCT LIST ##########
  @Get()
  @ApiSwaggerResponse(HttpStatus.OK, Product)
  @ApiQuery({
    name: 'brand',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'model',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'sizes',
    type: [Number],
    required: false,
  })
  @ApiQuery({
    name: 'categories',
    type: [Number],
    required: false,
  })
  async getList(@Query() params: Params): Promise<ApiResponse<Product[]>> {
    const filter = this.productService.setFilter(params);
    const products = await this.productService.getList(filter);

    return new ApiResponse(HttpStatus.OK, '', products);
  }
}
