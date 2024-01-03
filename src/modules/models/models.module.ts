import { Module } from '@nestjs/common';
import { ModelsController } from './models.controller';
import { ModelsService } from './models.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';
import { Product } from '../products/entities/product.entity';

@Module({
  controllers: [ModelsController],
  providers: [ModelsService],
  imports: [TypeOrmModule.forFeature([Model, Product])],
  exports: [ModelsService],
})
export class ModelsModule {}
