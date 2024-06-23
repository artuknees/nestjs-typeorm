import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './../entities/product.entity';
import {
  CreateProductDto,
  FilterProductDto,
  UpdateProductDto,
} from './../dtos/products.dtos';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, In, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll(params?: FilterProductDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      if (minPrice && maxPrice) {
        // aca armo el rango de precio
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        take: limit,
        skip: offset,
        where,
      });
    }
    return this.productRepo.find();
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
      // solo lo guarda si habia brand
    }
    if (data.categoriesId) {
      // agrego check de categorias
      const categories = await this.categoryRepo.find({
        where: { id: In(data.categoriesId) },
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    } // solo lo guarda si habia brand
    if (changes.categoriesId) {
      // para cambios de categorias
      const categories = await this.categoryRepo.find({
        where: { id: In(changes.categoriesId) },
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, changes); // pone los cambios
    return this.productRepo.save(product);
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'], // debo incluir la relacion para que traiga el array
    });
    // se elimina el id con un metodo inmutable
    product.categories = product.categories.filter(
      (el) => el.id !== categoryId,
    );
    return this.productRepo.save(product);
  }

  async addCategoryToproduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'], // debo incluir la relacion para que traiga el array
    });
    // primero hay que hacer get a la categoria
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  remove(id: number) {
    return this.productRepo.delete(id); // podria validad si el producto existe
  }
}
