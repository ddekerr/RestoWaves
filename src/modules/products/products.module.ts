import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { Product } from './entities/product.entity';
import { CategoriesModule } from '../categories/categories.module';
import { BrandsModule } from '../brands/brands.module';
import { ModelsModule } from '../models/models.module';
import { Model } from '../models/entities/model.entity';
import { Brand } from '../brands/entities/brand.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    TypeOrmModule.forFeature([Product, Model, Brand, Category]),
    CategoriesModule,
    BrandsModule,
    ModelsModule,
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
