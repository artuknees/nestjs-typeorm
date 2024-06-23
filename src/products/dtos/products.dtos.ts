import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly description: string;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly stock: number;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty()
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsPositive()
  readonly brandId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  readonly categoriesId: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductDto {
  @IsOptional()
  @IsPositive() // no puedo pedir cero
  @ApiProperty()
  limit: number;

  @IsOptional()
  @Min(0) // minimo cero en adelante
  @ApiProperty()
  offset: number;

  @IsOptional()
  @Min(0)
  @ApiProperty()
  minPrice: number;

  @ValidateIf((item) => item.minPrice) // cuando exista un minPrice, esto debe estar
  @Min(0)
  @ApiProperty()
  maxPrice: number;
}
