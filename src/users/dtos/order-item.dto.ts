import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly orderId: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly productId: number;

  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;
}

export class UpdateOrderItemDto extends PartialType(CreateOrderItemDto) {}
