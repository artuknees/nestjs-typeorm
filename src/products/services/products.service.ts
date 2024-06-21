import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './../dtos/products.dtos';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data); // con esto asigna todo siguiendo lo que vino del DTO. Esto crea la instancia
    return this.productRepo.save(newProduct); // esto guarda la instancia
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    this.productRepo.merge(product, changes); // pone los cambios
    return this.productRepo.save(product);
  }

  async remove(id: number) {
    return this.productRepo.delete(id); // podria validad si el producto existe
  }
}
