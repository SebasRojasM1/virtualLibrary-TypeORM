import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { SalesService } from '../services/sales.service';
import { CreateSaleDto, UpdateSaleDto} from '../dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly saleService: SalesService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a book to the system.', description: 'Create a book to access the system.' })
  @ApiResponse({status: 201, description: 'Book created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the book is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the book.'})
  create(@Body() createSale: CreateSaleDto) {
    return this.saleService.createSale(createSale);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Find all the books of the system.', description: 'View all books registered in the system.' })
  @ApiResponse({status: 200, description: 'All books were found successfully.'})
  @ApiResponse({status: 404, description: 'No books were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the books.'})
  findAll() {
    return this.saleService.fillAllSales();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the book by ID of the system.', description: 'View a specific book registered in the database.' })
  @ApiResponse({status: 200, description: 'Book found successfully.',})
  @ApiResponse({status: 404, description: 'Book with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the book.'})
  findOne(@Param('id') id: number) {
    return this.saleService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a book to the system.', description: 'Update a specific book registered in the database.' })
  @ApiResponse({status: 200, description: 'Book updated successfully.'})
  @ApiResponse({status: 404, description: 'Book with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the book.'})
  update(@Param('id') id: number, @Body() updateSale: UpdateSaleDto) {
    return this.saleService.updateSale(id, updateSale);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a book to the system.', description: 'Delete a book of the system.' })
  @ApiResponse({status: 200, description: 'Book deleted successfully.'})
  @ApiResponse({status: 404, description: 'Book with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the book.'})
  remove(@Param('id') id: number) {
    return this.saleService.deleteSale(id);
  }
}
