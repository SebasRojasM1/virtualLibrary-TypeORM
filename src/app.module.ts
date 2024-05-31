import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthorController } from './models/author/controllers/author.controller';
import { AuthorService } from './models/author/services/author.service';


@Module({
  imports: [ConfigModule.forRoot({
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
    entities: [],  
    extra: {
      ssl: true,
    },
  }),
  TypeOrmModule.forFeature([]), // Register your entities
  ,],
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AppModule {}
