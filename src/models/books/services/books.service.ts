/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor( @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,) {}
  
  async createBook(createBook: CreateBookDto) {
    const book = this.bookRepository.create(createBook);
    return await this.bookRepository.save(book);
  }

  async fillAllBooks() {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    return book;
  }

  async updateBook(id: number, updateBook: UpdateBookDto): Promise<BookEntity> {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    await this.bookRepository.update(id, updateBook);

    const updatedBook = await this.bookRepository.findOneBy({ id });
    if (!updatedBook) {
      throw new NotFoundException(`Game with ID ${id} not found.`);
    }
    return updatedBook;
  }

  async deleteBook(id: number) {
    const book = await this.bookRepository.findOneBy({ id });

    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    return await this.bookRepository.remove(book);
  }
}
