import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>) {}
  
    async createCustomer(CreateCustomer: CreateCustomerDto) {

    const existCustomer = await this.customerRepository.findOneBy({ email: CreateCustomer.email });

    if (existCustomer) {
      throw new BadRequestException('Email is in use. Try again.');
    }

    const customer = this.customerRepository.create(CreateCustomer);

    return await this.customerRepository.save(customer);
  }

async findAllCustomers() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const client = await this.customerRepository.findOneBy({ id });
    
    if (!client) {
      throw new NotFoundException('client not found');
    }

    return client;;
  }

  async updateCustomer(id: number, updateCustomerDto: UpdateCustomerDto): Promise<CustomerEntity> {
    const updatedCustomer = await this.customerRepository.preload({
      id,
      ...updateCustomerDto,
    });

    if (!updatedCustomer) {
      throw new NotFoundException('The customer is not found. Try again.');
    }

    return this.customerRepository.save(updatedCustomer);
  }

  async deleteCustomer(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException('The customers it´s not found. Try Again.');
    }

    return await this.customerRepository.delete({ id });

  }
}
