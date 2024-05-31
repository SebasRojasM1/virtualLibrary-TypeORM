import { Module } from '@nestjs/common';
import { SalesService } from './services/sales.service';
import { SalesController } from './controllers/sales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './entities/sale.entity';
import { BookEntity } from '../books/entities/book.entity';
import { CustomerEntity } from '../customers/entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity, BookEntity, CustomerEntity])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
