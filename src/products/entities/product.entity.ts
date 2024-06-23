import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  Index,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity('Products')
@Index(['price', 'stock']) // asi indexo varios campos a la vez
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 220, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  // @Index() // la db sabe que el precio esta indexado. Una consulta por precio sera mas rapida
  // si solo indexo este campo, lo hago asi
  @Column({ type: 'int' })
  price: number;

  @Column({ type: 'int' })
  stock: number;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  // en los siguientes casos lo voy a extender de una clase generica
  @CreateDateColumn({
    // timestamp tz es que organiza la zona horaria. adapta al pais
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP', // se carga automatico
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP', // se carga automatico
  })
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.product)
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];
}
