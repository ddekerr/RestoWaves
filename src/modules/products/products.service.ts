import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArrayContains, FindOptionsWhere, In, Repository } from 'typeorm';
import exceptionMessages from 'src/constants/exceptionMessages';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';

import { CategoriesService } from '../categories/categories.service';
import { BrandsService } from '../brands/brands.service';
import { ModelsService } from '../models/models.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { Params } from './types';

@Injectable()
export class ProductsService {
  constructor(
    // same as this.productRepo = productRepo
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    private brandsService: BrandsService,
    private modelsService: ModelsService,
    private categoriesService: CategoriesService,
  ) {}

  // ########## CREATE NEW PRODUCT ##########
  async create(dto: CreateProductDto): Promise<Product> {
    const { title, code, price, sizes, brand, model, categoryIds } = dto;

    await this.checkProductExistance(code);

    // create product instance
    const newProduct = this.productRepo.create({
      title,
      code,
      price,
      sizes,
    });

    // get brand entity and set product brand
    if (brand) {
      const brand = await this.brandsService.createOrGet({ title: dto.brand });
      newProduct.brand = brand;
    }

    // get model entity and set product model
    if (model) {
      const model = await this.modelsService.createOrGet({ title: dto.model });
      newProduct.model = model;
    }

    // set to product all existing categories by IDs array
    if (categoryIds?.length) {
      const categories =
        await this.categoriesService.getCategoryList(categoryIds);
      newProduct.categories = categories;
    }

    // save new product
    return await this.productRepo.save(newProduct);
  }

  // ########## UPDATE PRODUCT ##########
  async update(
    id: number,
    dto: Omit<UpdateProductDto, 'brand' | 'model' | 'categoryIds'>,
  ): Promise<Product> {
    await this.productRepo.update(id, dto);
    return await this.getOneById(id);
  }

  // ########## UPDATE PRODUCT MODEL ##########
  async updateModel(id: number, dto: { model: string }): Promise<Product> {
    const product = await this.getOneById(id);
    if (product) {
      const model = await this.modelsService.createOrGet({ title: dto.model });
      product.model = model;
      return await this.productRepo.save(product);
    }
  }

  // ########## UPDATE PRODUCT BRAND ##########
  async updateBrand(id: number, dto: { brand: string }): Promise<Product> {
    const product = await this.getOneById(id);
    if (product) {
      const brand = await this.brandsService.createOrGet({ title: dto.brand });
      product.brand = brand;
      return await this.productRepo.save(product);
    }
  }

  // ########## UPDATE PRODUCT CATEGORIES ##########
  async updateCategories(
    id: number,
    dto: { categories: number[] },
  ): Promise<Product> {
    const product = await this.getOneById(id);
    if (product) {
      const categories = await this.categoriesService.getCategoryList(
        dto.categories,
      );
      product.categories = categories;
      return await this.productRepo.save(product);
    }
  }

  // ########## GET PRODUCT BY ID ##########
  async getOneById(id: number): Promise<Product> {
    return await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'model', 'categories'], // attach to product result other relation entity
    });
  }

  // ########## GET PRODUCT BY CODE ##########
  async getOneByCode(code: number): Promise<Product> {
    return await this.productRepo.findOneBy({ code });
  }

  // ########## GET PRODUCTS LIST ##########
  async getList(filter?: FindOptionsWhere<Product>): Promise<Product[]> {
    return await this.productRepo.find({
      where: filter,
      relations: ['brand', 'model', 'categories'], // attach to product result other relation entity
    });
  }

  // create special object to filter products
  setFilter(params: Params): FindOptionsWhere<Product> {
    const filter = Object.entries(params).reduce((prev, [key, value]) => {
      if (key === 'brand' || key === 'model') {
        prev[key] = { id: +value }; // { brand: { id: number }, model: { id: number } }
      }
      if (key === 'sizes') {
        prev[key] = ArrayContains(value.split(',').map((i) => +i)); // { sizes: ArrayContains(number[]) }
      }
      if (key === 'categories') {
        prev[key] = { id: In(value.split(',').map((i) => +i)) }; // { categories: { id: In(number[]) } }
      }

      return prev;
    }, {});

    return filter;
  }

  // check if there is a product with this code and throw 409 Status Code if so
  private async checkProductExistance(code: number): Promise<void> {
    const candidate = await this.productRepo.findOne({ where: { code } });
    if (candidate) {
      throw new ConflictException(exceptionMessages.PRODUCT_CODE_CONFLICT_MSG);
    }
  }
}
