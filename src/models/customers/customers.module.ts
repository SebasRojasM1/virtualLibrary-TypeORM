import { Module } from '@nestjs/common';
import { CustomersController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerEntity } from './entities/customer.entity';
import { SaleEntity } from '../sales/entities/sale.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, SaleEntity])],
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule {}
