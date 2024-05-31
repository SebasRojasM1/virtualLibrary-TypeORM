import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { CustomersService } from '../services/customers.service';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Customers")
@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post('/create')
  @ApiOperation({ summary: 'Create a customer to the system.', description: 'Create a customer to access the system.' })
  @ApiResponse({status: 201, description: 'Customer created successfully.'})
  @ApiResponse({status: 400, description: 'The data entered to create the customer is invalid.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while creating the customer.'})
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.createCustomer(createCustomerDto);
  }

  @Get("all")
  @ApiOperation({ summary: 'Find all the customers of the system.', description: 'View all customers registered in the system.' })
  @ApiResponse({status: 200, description: 'All customers were found successfully.'})
  @ApiResponse({status: 404, description: 'No customers were found in the system.'})
  @ApiResponse({status: 500,description: 'An internal server error occurred while searching for the customers.'})
  async findAll() { 
    const customer = await this.customersService.findAllCustomers();
    if (customer.length === 0) {
      throw new NotFoundException('No customer were found in the system.');
    }
    return customer;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find the customer by ID of the system.', description: 'View a specific customer registered in the database.' })
  @ApiResponse({status: 200, description: 'Customer found successfully.',})
  @ApiResponse({status: 404, description: 'Customer with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while searching for the customer.'})
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(+id);
  }

  @Put('update/:id')
  @ApiOperation({ summary: 'Update a customer to the system.', description: 'Update a specific customer registered in the database.' })
  @ApiResponse({status: 200, description: 'Customer updated successfully.'})
  @ApiResponse({status: 404, description: 'Customer with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while updating the customer.'})
  update(@Param('id') id: number, @Body() updateCustomerDto: UpdateCustomerDto) {
    return this.customersService.updateCustomer(id, updateCustomerDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Delete a customer to the system.', description: 'Delete a customer of the system.' })
  @ApiResponse({status: 200, description: 'Customer deleted successfully.'})
  @ApiResponse({status: 404, description: 'Customer with the entered ID not found.'})
  @ApiResponse({status: 500, description: 'An internal server error occurred while deleting the customer.'})
  remove(@Param('id') id: number) {
    return this.customersService.deleteCustomer(id);
  }
}
