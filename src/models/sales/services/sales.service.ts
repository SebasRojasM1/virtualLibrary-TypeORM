import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto, UpdateSaleDto } from '../dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleEntity } from '../entities/sale.entity';

@Injectable()
export class SalesService {
  constructor( @InjectRepository(SaleEntity) private readonly saleRepository: Repository<SaleEntity>,) {}
  
  async createSale(createSale: CreateSaleDto) {
    const book = this.saleRepository.create(createSale);
    return await this.saleRepository.save(book);
  }

  async fillAllSales() {
    return await this.saleRepository.find();
  }

  async findOne(id: string) {
    const sale = await this.saleRepository.findOneBy({ id });

    if (!sale) throw new NotFoundException(`Sale with id ${id} not found`);

    return sale;
  }

  async updateSale(id: string, updateSale: UpdateSaleDto): Promise<SaleEntity> {
    const sale = await this.saleRepository.findOneBy({ id });

    if (!sale) {
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    await this.saleRepository.update(id, updateSale);

    const updatedSale = await this.saleRepository.findOneBy({ id });
    if (!updatedSale) {
      throw new NotFoundException(`Game with ID ${id} not found.`);
    }
    return updatedSale;
  }

  async deleteSale(id: string) {
    const sale = await this.saleRepository.findOneBy({ id });

    if (!sale) throw new NotFoundException(`Sale with id ${id} not found`);

    return await this.saleRepository.remove(sale);
  }
}
