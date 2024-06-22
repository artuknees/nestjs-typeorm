import { Product } from '../../products/entities/product.entity';
import { DateCommonEntity } from '../../global/entities/date-common.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity('Order-Product')
export class OrderProduct extends DateCommonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Product)
  // no le pongo el extra porque digo que corresponde pero no me interesa acceder a ese parametro
  product: Product;

  @ManyToOne(() => Order, (order) => order.items)
  order: Order;
}
