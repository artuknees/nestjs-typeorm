import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { DateCommonEntity } from '../../global/entities/date-common.entity';
import { User } from './user.entity';

@Entity('Customer')
export class Customer extends DateCommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;

  @Column({ type: 'varchar', length: 255 })
  phone: string;

  @OneToOne(() => User, (user) => user.customer, { nullable: true })
  user: User;

  // por herencia le agregue las fechas createdAt y updatedAt
}
