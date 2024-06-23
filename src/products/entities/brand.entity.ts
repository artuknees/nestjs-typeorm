import { DateCommonEntity } from '../../global/entities/date-common.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'brands' })
export class Brand extends DateCommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @OneToMany(() => Product, (product) => product.brand)
  product: Product[];
}
