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
  JoinColumn,
} from 'typeorm';
import { Brand } from './brand.entity';
import { Category } from './category.entity';

@Entity({ name: 'products' }) // modifico el nombre de la tabla
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
    name: 'created_at', // defino el nombre de la columna en la base de datos
    // timestamp tz es que organiza la zona horaria. adapta al pais
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP', // se carga automatico
  })
  createdAt: Date; // esto esta bien manejarlo en camel case porque es del lado de JS

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP', // se carga automatico
  })
  updatedAt: Date;

  @ManyToOne(() => Brand, (brand) => brand.product)
  // este tiene la relacion siempre por ser la entidad debil. le agrego el JoinColumn para especificar el nombre de la columna
  @JoinColumn({ name: 'brand_id' })
  brand: Brand;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable({
    name: 'product_categories', // el nombre de la tabla, que typeORM armo por defecto
    joinColumn: {
      name: 'product_id', // aca se pone la entidad en donde estoy ahora
    },
    inverseJoinColumn: {
      name: 'category_id', // el nombre de la otra columna
    },
  }) // tiene la relacion
  categories: Category[];
}
