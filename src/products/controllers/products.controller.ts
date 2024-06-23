import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  HttpStatus,
  HttpCode,
  Patch,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { ProductsService } from './../services/products.service';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'List of products' })
  getProducts(@Query() params: FilterProductDto) {
    return this.productsService.findAll(params);
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productsService.update(id, payload);
  }

  @Patch(':id/category/:categoryId')
  addCategory(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToproduct(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
    // le pido parse int para que lo haga numero, porque si no llega como string
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
