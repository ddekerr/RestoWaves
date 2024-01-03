import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    // same as this.categoryRepo = categoryRepo
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  // ########## CREATE NEW CATEGORY ##########
  async create(dto: CreateCategoryDto): Promise<Category> {
    // if category exist return it
    const candidate = await this.categoryRepo.findOneBy({ title: dto.title });
    if (candidate) {
      return candidate;
    }

    // create category instance
    const newCategory = this.categoryRepo.create(dto);

    // set parent category
    if (dto.parentId) {
      const parent = await this.getById(dto.parentId);
      newCategory.parent = parent;
    }

    // save new category
    return await this.categoryRepo.save(newCategory);
  }

  // ########## UPDATE CATEGORY ##########
  async update(id: number, dto: CreateCategoryDto): Promise<Category> {
    await this.categoryRepo.update({ id }, dto);
    return await this.getById(id);
  }

  // ########## REMOVE CATEGORY ##########
  async delete(id: number): Promise<string> {
    await this.categoryRepo.delete(id);
    return 'Category has been deleted';
  }

  // ########## GET ONE CATEGORY BY ID ##########
  async getById(id: number): Promise<Category> {
    return await this.categoryRepo.findOne({
      where: { id },
      relations: ['parent', 'products'], // attach to category result other relation entity
    });
  }

  // ########## GET ALL CATEGORY ##########
  async getCategoryList(ids?: number[]): Promise<Category[]> {
    // find all categories which IDs are in the array
    const filter = ids ? { id: In(ids) } : {};

    return await this.categoryRepo.find({
      where: filter,
      relations: ['parent'], // atach parent category
    });
  }
}
