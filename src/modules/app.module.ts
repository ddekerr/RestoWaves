import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

import { BrandsModule } from './brands/brands.module';
import { ModelsModule } from './models/models.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { ScheduleModule } from '@nestjs/schedule';
import { Model } from './models/entities/model.entity';
import { Product } from './products/entities/product.entity';
import { Brand } from './brands/entities/brand.entity';
import { Category } from './categories/entities/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Model, Product, Brand, Category],
      synchronize: true,
      ssl: true,
    }),
    CategoriesModule,
    ProductsModule,
    BrandsModule,
    ModelsModule,
    GoogleSheetsModule,
  ],
})
export class AppModule {}
