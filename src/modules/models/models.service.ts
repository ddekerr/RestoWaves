import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Model } from './entities/model.entity';
import { UpdateModelDto } from './dto/update-model.dto';
import { CreateModelDto } from './dto/create-model.dto';

@Injectable()
export class ModelsService {
  constructor(
    @InjectRepository(Model)
    private modelRepo: Repository<Model>,
  ) {}

  async createOrGet(dto: CreateModelDto): Promise<Model> {
    const candidate = await this.modelRepo.findOne({
      where: { title: dto.title }, // find by title
    });

    // if model title is exist return it
    if (candidate) {
      return candidate;
    }

    // else create new model and return it
    const newModel = this.modelRepo.create(dto);
    return await this.modelRepo.save(newModel);
  }

  async update(id: number, dto: UpdateModelDto): Promise<Model> {
    await this.modelRepo.update(id, dto);
    return await this.modelRepo.findOne({ where: { id } });
  }
}
