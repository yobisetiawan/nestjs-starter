// src/product/product.service.ts

import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const dt = await this.productRepository.findOne({ where: { id: id } });
    if (!dt) {
      throw new HttpException(
        `${Product.name} with id ${id} is not found`,
        404,
      );
    }
    return dt;
  }

  async create(product: Partial<Product>) {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async update(id: number, product: Partial<Product>) {
    await this.productRepository.update(id, product);
    return this.productRepository.findOne({ where: { id: id } });
  }

  async delete(id: number) {
    const dt = await this.findOne(id);
    await this.productRepository.softDelete(dt.id);
    return { success: true };
  }
}
