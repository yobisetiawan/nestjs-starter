// src/product/dto/create-product.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDecimal, IsNotEmpty } from 'class-validator';

export class ProductCreateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsDecimal()
  @IsNotEmpty()
  readonly price: number;
}
