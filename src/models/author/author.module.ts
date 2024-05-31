import { Module } from '@nestjs/common';
import { AuthorService } from './services/author.service';
import { AuthorController } from './controllers/author.controller';

@Module({
  controllers: [AuthorController],
  providers: [AuthorService],
})
export class AuthorModule {}
