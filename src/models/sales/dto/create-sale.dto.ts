import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameBook: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nameCustomer: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  stock: number
}
