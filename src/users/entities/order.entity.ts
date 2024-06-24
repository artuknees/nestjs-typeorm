import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateCommonEntity } from '../../global/entities/date-common.entity';
import { Customer } from './customer.entity';
import { OrderProduct } from './order-product.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity({ name: 'orders' })
export class Order extends DateCommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Exclude()
  // le agrego los items y los referencio a la tabla ternaria
  @OneToMany(() => OrderProduct, (item) => item.order)
  items: OrderProduct[];

  @Expose()
  get products() {
    if (this.items) {
      // veo que tenga items
      return this.items
        .filter((el) => !!el) // filtro que no haya nulos
        .map((el) => ({
          ...el.product,
          quantity: el.quantity,
          itemId: el.id,
        }));
    }
    return [];
  }

  @Expose()
  get total() {
    if (this.items) {
      return this.items
        .filter((item) => !!item)
        .reduce((total, item) => {
          return total + item.product.price * item.quantity;
        }, 0);
    }
    return 0;
  }
}
