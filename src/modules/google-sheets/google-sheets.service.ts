import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { ProductsService } from '../products/products.service';
import { CreateProductDto } from '../products/dto/create-product.dto';

const START_ROW = 7; // from 4 row
const END_ROW = 17; // to 18 row
const START_COLUMN = 1; // from B column
const END_COLUMN = 25; // to Z column
const CODE_ROW_INDEX = 5;

@Injectable()
export class GoogleSheetsService {
  private models: string[] = [];
  private dtos: CreateProductDto[] = [];

  private serviceAccountAuth = new JWT({
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/gm, '\n'),
    email: process.env.GOOGLE_SERVICE_EMAIL,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  private SHEET_ID = '1bjqDqLZgjZSZ_fOBolseUDg7L0ktG50BlD9tAYm4rwg';

  private doc = new GoogleSpreadsheet(this.SHEET_ID, this.serviceAccountAuth);

  constructor(private productsService: ProductsService) {}

  @Cron('0 0 * * * *')
  async checkGoogleSheet() {
    await this.doc.loadInfo();

    await this.createModelsArray();
    await this.createDtosFromAllSheets();
    this.dtos.forEach(async (product) => {
      const candidate = await this.productsService.getOneByCode(product.code);

      if (!candidate) {
        return await this.productsService.create(product);
      }

      return await this.productsService.update(candidate.id, {
        sizes: product.sizes,
      });
    });
  }

  private async createModelsArray(): Promise<void> {
    for (let i = 0; i < this.doc.sheetCount; i++) {
      const title = this.doc.sheetsByIndex[i].title;
      this.models.push(title);
    }
  }

  private async createDtosFromAllSheets(): Promise<void> {
    this.models.forEach(async (title) => {
      const sheet = this.doc.sheetsByTitle[title];
      await sheet.loadCells('A4:Z18');

      // iterate by columns
      for (let i = START_COLUMN; i <= END_COLUMN; i += 1) {
        const codeCell = sheet.getCell(CODE_ROW_INDEX, i);
        if (codeCell?.value) {
          const dto = this.createDtoFromColumn(sheet, i);
          this.dtos.push(dto);
        }
      }
    });
  }

  private createDtoFromColumn(
    sheet: GoogleSpreadsheetWorksheet,
    column: number,
  ): CreateProductDto {
    const title = sheet.getCell(3, column).value as string;
    const price = sheet.getCell(4, column).value as number;
    const code = sheet.getCell(5, column).value as number;
    const sizes: number[] = [];
    const model = sheet.title;

    // iterate by sizes rows
    for (let i = START_ROW; i <= END_ROW; i += 1) {
      // if cell has value
      if (sheet.getCell(i, column).value !== null) {
        // push title row value to sizes
        sizes.push(sheet.getCell(i, 0).value as number);
      }
    }
    return { title, price, code, sizes, model };
  }
}
