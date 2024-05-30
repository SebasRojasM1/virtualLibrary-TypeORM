import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { BookEntity } from './models/books/entities/book.entity';
import { BooksController } from './models/books/controllers/books.controller';
import { BooksService } from './models/books/services/books.service';

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
      synchronize: false,
      entities: [BookEntity],
      extra: {
        ssl: true,
      },
    }),
    TypeOrmModule.forFeature([BookEntity]), // Register your entities
    ,
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class AppModule {}
