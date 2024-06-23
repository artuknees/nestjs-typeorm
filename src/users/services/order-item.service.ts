import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from '../dtos/order-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import { Repository } from 'typeorm';
import { OrderProduct } from '../entities/order-product.entity';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderProduct)
    private orderProductRepo: Repository<OrderProduct>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.orderProductRepo.find();
  }

  async findOne(id: number) {
    const orderItem = await this.orderProductRepo.findOne({
      where: { id },
      relations: ['order', 'product'],
    });
    if (!orderItem) {
      throw new NotFoundException(`OrderItem #${id} not found`);
    }
    return orderItem;
  }

  async create(data: CreateOrderItemDto) {
    // encuentro la orden y el producto
    const order = await this.orderRepo.findOne({ where: { id: data.orderId } });
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });
    const newOrderItem = new OrderProduct(); // inicializo
    newOrderItem.order = order;
    newOrderItem.product = product;
    newOrderItem.quantity = data.quantity;
    return this.orderProductRepo.save(newOrderItem);
  }
}
