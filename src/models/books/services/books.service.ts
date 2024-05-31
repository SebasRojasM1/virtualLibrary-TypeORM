/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto, UpdateBookDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from '../entities/book.entity';
import { Repository } from 'typeorm';
import { AuthorEntity } from 'src/models/author/entities/author.entity';

@Injectable()
export class BooksService {
  constructor( @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>,
              @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>) {}
  
  async createBook(createBook: CreateBookDto) {
    const existingBook = await this.bookRepository.findOneBy({ title: createBook.title });

    if (existingBook) {
      throw new BadRequestException('The book already exists. Try again.');
    }

    const author = await this.authorRepository.findOneBy({ id: createBook.author_Id });
    if (!author) {
      throw new NotFoundException('The author of the book it´s not found');
    }

    const book = this.bookRepository.create({
      ...createBook,
      author,
    });

    return await this.bookRepository.save(book);
  }

  async fillAllBooks() {
    return await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author').getMany();
  }

  async findOne(id: number) {
    const book = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .where('book.id = :id', { id })
      .getOne();

    if (!book) {
      throw new NotFoundException('The book it´s not found. Try again.');
    }

    return book;
  }

  async updateBook(id: number, updateBook: UpdateBookDto): Promise<BookEntity> {
    const existingBook = await this.bookRepository.findOneBy({ id });

    if (!existingBook) {
      throw new NotFoundException('Book not found');
    }

    if ('author_Id' in updateBook) {
      const authorId = updateBook.author_Id;

      const author = await this.authorRepository.findOne({ where: { id: authorId }, relations: ['books'] }); 

        if (!author) {
          throw new NotFoundException('The author it´s not found');
        }

        existingBook.author = author;
    }

    if (updateBook.title) {
      existingBook.title = updateBook.title;
    }

    if (updateBook.description) {
      existingBook.description = updateBook.description;
    }
  
    await this.bookRepository.save(existingBook);
    
    const updatedBook = await this.bookRepository.findOne({ where: { id }, relations: ['author'] });

    if (!updatedBook) {
      throw new NotFoundException('The searched book has not been found. Retry.');
    }

    return updatedBook;
  }

  async deleteBook(id: number) {
    const deleteBook = await this.bookRepository
      .createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .where('book.id = :id', { id })
      .getOne();

    if (!deleteBook) {
      throw new NotFoundException('Book not found');
    }
   
    await this.bookRepository.softDelete({ id });
   
    return deleteBook;
  }
}
