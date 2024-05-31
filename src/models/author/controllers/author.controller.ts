import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { CreateAuthorDto, UpdateAuthorDto } from '../dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Authors")
@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create an author to the system.', description: 'Create an author to access the system.' })
  @ApiResponse({status: 201, description: 'Author created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the author is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the author.'})
  create(@Body() createAuthor: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthor);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Find all the authors of the system.', description: 'View all authors registered in the system.' })
  @ApiResponse({status: 200, description: 'All authors were found successfully.'})
  @ApiResponse({status: 404, description: 'No authors were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the authors.'})
  findAll() {
    return this.authorService.fillAllAuthors();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the author by ID of the system.', description: 'View a specific author registered in the database.' })
  @ApiResponse({status: 200, description: 'Author found successfully.',})
  @ApiResponse({status: 404, description: 'Author with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the author.'})
  findOne(@Param('id') id: number) {
    return this.authorService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update an author to the system.', description: 'Update a specific author registered in the database.' })
  @ApiResponse({status: 200, description: 'Author updated successfully.'})
  @ApiResponse({status: 404, description: 'Author with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the author.'})
  update(@Param('id') id: number, @Body() updateAuthor: UpdateAuthorDto) {
    return this.authorService.updateAuthor(id, updateAuthor);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete an author to the system.', description: 'Delete an author of the system.' })
  @ApiResponse({status: 200, description: 'Author deleted successfully.'})
  @ApiResponse({status: 404, description: 'Author with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the author.'})
  remove(@Param('id') id: number) {
    return this.authorService.deleteAuthor(id);
  }
}
