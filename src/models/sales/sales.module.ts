import { Module } from '@nestjs/common';
import { SalesService } from './services/sales.service';
import { SalesController } from './controllers/sales.controller';

@Module({
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}