import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, UseGuards } from '@nestjs/common';
import { SalesService } from '../services/sales.service';
import { CreateSaleDto, UpdateSaleDto} from '../dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TimeAccessGuard } from 'src/libs/guard/access-hour/access-hour';

@ApiTags('Sales')
@Controller('sales')
export class SalesController {
  constructor(private readonly saleService: SalesService) {}

  @UseGuards(TimeAccessGuard)
  @Post('/create')
  @ApiOperation({ summary: 'Create a sale to the system.', description: 'Create a sale to access the system.' })
  @ApiResponse({status: 201, description: 'sale created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the sale is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the sale.'})
  create(@Body() createSale: CreateSaleDto) {
    return this.saleService.createSale(createSale);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Find all the sales of the system.', description: 'View all sales registered in the system.' })
  @ApiResponse({status: 200, description: 'All sales were found successfully.'})
  @ApiResponse({status: 404, description: 'No sales were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the sales.'})
  async findAll() {
    const customer = await this.saleService.fillAllSales();
    if (customer.length === 0) {
      throw new NotFoundException('No sales were found in the system.');
    }
    return customer;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the sale by ID of the system.', description: 'View a specific sale registered in the database.' })
  @ApiResponse({status: 200, description: 'Sale found successfully.',})
  @ApiResponse({status: 404, description: 'Sale with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the sale.'})
  findOne(@Param('id') id: number) {
    return this.saleService.findOne(id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a sale to the system.', description: 'Update a specific sale registered in the database.' })
  @ApiResponse({status: 200, description: 'Sale updated successfully.'})
  @ApiResponse({status: 404, description: 'Sale with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the sale.'})
  update(@Param('id') id: number, @Body() updateSale: UpdateSaleDto) {
    return this.saleService.updateSale(id, updateSale);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a sale to the system.', description: 'Delete a sale of the system.' })
  @ApiResponse({status: 200, description: 'Sale deleted successfully.'})
  @ApiResponse({status: 404, description: 'Sale with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the sale.'})
  remove(@Param('id') id: number) {
    return this.saleService.deleteSale(id);
  }
}
