import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto, UpdateAuthorDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from '../entities/author.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor( @InjectRepository(AuthorEntity) private readonly authorRepository: Repository<AuthorEntity>,) {}
  
  async createAuthor(CreateAuthor: CreateAuthorDto) {
    const author = this.authorRepository.create(CreateAuthor);
    return await this.authorRepository.save(author);
  }

  async fillAllAuthors() {
    return await this.authorRepository.find();
  }

  async findOne(id: number) {
    const author = await this.authorRepository.findOneBy({ id });

    if (!author) throw new NotFoundException(`Author with id ${id} not found`);

    return author;
  }

  async updateAuthor(id: number, updateAuthor: UpdateAuthorDto): Promise<AuthorEntity> {
    const author = await this.authorRepository.findOneBy({ id });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    await this.authorRepository.update(id, updateAuthor);

    const updatedAuthor = await this.authorRepository.findOneBy({ id });
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found.`);
    }
    return updatedAuthor;
  }

  async deleteAuthor(id: number) {
    const author = await this.authorRepository.findOneBy({ id });

    if (!author) throw new NotFoundException(`Author with id ${id} not found`);

    return await this.authorRepository.remove(author);
  }
}
