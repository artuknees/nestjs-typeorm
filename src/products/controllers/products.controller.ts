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
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ParseIntPipe } from '../../common/parse-int.pipe';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from '../dtos/products.dtos';
import { ProductsService } from './../services/products.service';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

import { Public } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/models/roles.model';

// @UseGuards(AuthGuard('jwt')) // le puse el guard del jwt strategy para todos los endpoints de productos
@UseGuards(JwtAuthGuard, RolesGuard) // le pongo el guard custom que ya incluye el jwt strategy
// pongo los dos guards juntos -> eso ejecuta primero el de jwt y segundo el de roles
@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public() // Usando mi decorador custom Public, este endpoint no debera ser revisado
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

  @Roles(Role.ADMIN)
  // @Roles(Role.ADMIN, Role.SUPERADMIN) --> asi puedo mandar mas
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
