import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Brand } from 'src/modules/brands/entities/brand.entity';
import { Model } from 'src/modules/models/entities/model.entity';
import { Category } from 'src/modules/categories/entities/category.entity';

@Entity()
export class Product {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column({ unique: true })
  code: number;

  @ApiProperty()
  @Column()
  price: number;

  @ApiProperty({ type: [Number] })
  @Column('int', {
    array: true,
    nullable: true,
  })
  sizes: number[];

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'SET NULL' })
  brand: Brand;

  @ManyToOne(() => Model, (model) => model.products, { onDelete: 'SET NULL' })
  model: Model;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
