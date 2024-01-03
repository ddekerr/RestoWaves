import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from './entities/brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private brandRepo: Repository<Brand>,
  ) {}

  async createOrGet(dto: CreateBrandDto): Promise<Brand> {
    const candidate = await this.brandRepo.findOne({
      where: { title: dto.title }, // find by title
    });

    // if brand title is exist return it
    if (candidate) {
      return candidate;
    }

    // else create new brand and return it
    const newBrand = this.brandRepo.create(dto);
    return await this.brandRepo.save(newBrand);
  }

  async update(id: number, dto: UpdateBrandDto): Promise<Brand> {
    await this.brandRepo.update(id, dto);
    return await this.brandRepo.findOne({ where: { id } });
  }
}
