import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SalesController } from './models/sales/controllers/sales.controller';
import { SalesService } from './models/sales/services/sales.service';
import { SaleEntity } from './models/sales/entities/sale.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [SaleEntity],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([SaleEntity]), // Register your entities
  ],
  controllers: [SalesController],
  providers: [SalesService],
})
export class AppModule {}
