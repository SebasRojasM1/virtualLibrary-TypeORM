import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from '../dto';
import { Repository } from 'typeorm';
import { CustomerEntity } from '../entities/customer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(CustomerEntity) private readonly customerRepository: Repository<CustomerEntity>) {}
  
    async create(CreateCustomer: CreateCustomerDto) {

    const existingClient = await this.customerRepository.findOneBy({ email: CreateCustomer.email });

    if (existingClient) {
      throw new BadRequestException('Email is in use. Try again.');
    }

    const client = this.customerRepository.create(CreateCustomer);

    return await this.customerRepository.save(client);
  }

async findAll() {
    return await this.customerRepository.find();
  }

  async findOne(id: number) {
    const client = await this.customerRepository.findOneBy({ id });
    
    if (!client) {
      throw new NotFoundException('client not found');
    }

    return client;;
  }

  async update(id: number, UpdateCustomer: UpdateCustomerDto) {
    const existclient = await this.customerRepository.findOneBy({ id });

    if (!existclient) {
      throw new NotFoundException('Client not found');
    }

    await this.customerRepository.update(id, UpdateCustomer);
    
    const updatedClient = await this.customerRepository.findOneBy({ id });

    if (!updatedClient) {
      throw new NotFoundException('Could not find updated client');
    }

    return updatedClient;
  }

  async remove(id: number) {
    const customer = await this.customerRepository.findOneBy({ id });

    if (!customer) {
      throw new NotFoundException('The customers it´s not found. Try Again.');
    }

    return await this.customerRepository.delete({ id });

  }
}
