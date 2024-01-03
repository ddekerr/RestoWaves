import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/modules/products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

@Entity()
export class Category {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'SET NULL',
  })
  parent: Category;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[];
}
