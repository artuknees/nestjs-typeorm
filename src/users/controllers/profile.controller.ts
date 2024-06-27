import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PayloadToken } from 'src/auth/models/token.model';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Order } from '../entities/order.entity';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  // @Roles(Role.CUSTOMER)
  @Get('my-orders')
  async getOrders(@Req() req: Request) {
    const user = req.user as PayloadToken;
    const fullUser = await this.userRepo.findOne({
      where: { id: user.sub },
      relations: { customer: true },
    });
    return this.orderRepo.findOne({
      where: {
        customer: {
          id: fullUser.customer.id,
        },
      },
      relations: {
        customer: true,
        items: {
          product: true,
        },
      },
    });
  }
}
