import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateCommonEntity } from '../../global/entities/date-common.entity';
import { Customer } from './customer.entity';
import { OrderProduct } from './order-product.entity';

@Entity('Order')
export class Order extends DateCommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  // le agrego los items y los referencio a la tabla ternaria
  @OneToMany(() => OrderProduct, (item) => item.order)
  items: OrderProduct[];
}
