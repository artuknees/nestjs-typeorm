import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { DateCommonEntity } from '../../global/entities/date-common.entity';
import { Customer } from './customer.entity';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User extends DateCommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string; // should be encrypted

  @Column({ type: 'varchar', length: 100 })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true }) // digo que hay referencia a customer pero que puede ser nulleable
  @JoinColumn({ name: 'customer_id' }) // en relaciones uno a uno, solo una de las tablas carga con la relacion y con este decorador se indica.
  // le cambio el nombre de la relacion en la db
  customer: Customer;

  // included creadedAt and updatedAt with inheritance
}
