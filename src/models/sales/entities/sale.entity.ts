import { BookEntity } from 'src/models/books/entities/book.entity';
import { CustomerEntity } from 'src/models/customers/entities/customer.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameCustomer: string;

  @Column()
  price: number;

  @ManyToOne(() => BookEntity, book => book.sales)
  @JoinColumn({ name: 'book_Id' }) 
  book: BookEntity;

  @ManyToOne(() => CustomerEntity, client => client.sales)
  @JoinColumn({ name: 'customer_Id' }) 
  customer: CustomerEntity;
}
