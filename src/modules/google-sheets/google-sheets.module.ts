import { Module } from '@nestjs/common';
import { GoogleSheetsService } from './google-sheets.service';
import { ModelsModule } from '../models/models.module';
import { ProductsModule } from '../products/products.module';

@Module({
  providers: [GoogleSheetsService],
  imports: [ModelsModule, ProductsModule],
})
export class GoogleSheetsModule {}
