import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a book to the system.', description: 'Create a book to access the system.' })
  @ApiResponse({status: 201, description: 'Book created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the book is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the book.'})
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Find all the books of the system.', description: 'View all books registered in the system.' })
  @ApiResponse({status: 200, description: 'All books were found successfully.'})
  @ApiResponse({status: 404, description: 'No books were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the books.'})
  async findAll() {
    const books = await this.booksService.fillAllBooks();
    if (books.length === 0) {
      throw new NotFoundException('No books were found in the system.');
    }
    return books;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the book by ID of the system.', description: 'View a specific book registered in the database.' })
  @ApiResponse({status: 200, description: 'Book found successfully.',})
  @ApiResponse({status: 404, description: 'Book with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the book.'})
  findOne(@Param('id') id: number) {
    return this.booksService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a book to the system.', description: 'Update a specific book registered in the database.' })
  @ApiResponse({status: 200, description: 'Book updated successfully.'})
  @ApiResponse({status: 404, description: 'Book with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the book.'})
  update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a book to the system.', description: 'Delete a book of the system.' })
  @ApiResponse({status: 200, description: 'Book deleted successfully.'})
  @ApiResponse({status: 404, description: 'Book with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the book.'})
  remove(@Param('id') id: number) {
    return this.booksService.deleteBook(id);
  }
}
