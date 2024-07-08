// src/product/product.controller.ts

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { ProductCreateDto } from './dto/product.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @ApiBody({ type: ProductCreateDto })
  async create(@Body() product: Partial<Product>) {
    return this.productService.create(product);
  }

  @Put(':id')
  @ApiBody({ type: ProductCreateDto })
  async update(
    @Param('id') id: number,
    @Body() product: ProductCreateDto,
  ): Promise<Product> {
    return this.productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
