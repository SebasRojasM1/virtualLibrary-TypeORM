import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SalesController } from './models/sales/controllers/sales.controller';
import { SalesService } from './models/sales/services/sales.service';
import { SaleEntity } from './models/sales/entities/sale.entity';
import { AuthorController } from './models/author/controllers/author.controller';
import { AuthorService } from './models/author/services/author.service';
import { AuthorEntity } from './models/author/entities/author.entity';
import { BookEntity } from './models/books/entities/book.entity';
import { BooksController } from './models/books/controllers/books.controller';
import { BooksService } from './models/books/services/books.service';
import { CustomerEntity } from './models/customers/entities/customer.entity';
import { CustomersService } from './models/customers/services/customers.service';
import { CustomersController } from './models/customers/controllers/customers.controller';

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
      entities: [AuthorEntity, BookEntity, SaleEntity, CustomerEntity],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([AuthorEntity, BookEntity, SaleEntity, CustomerEntity]), // Register your entities
  ],
  controllers: [AuthorController, SalesController, BooksController, CustomersController],
  providers: [AuthorService, SalesService, BooksService, CustomersService],
})
export class AppModule {}
