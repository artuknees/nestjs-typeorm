import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsPositive()
  @IsNotEmpty()
  readonly customerId: number; // readnonly para que no te permita cambiar esto en el codigo.
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}
