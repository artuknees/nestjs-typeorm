import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;
}
