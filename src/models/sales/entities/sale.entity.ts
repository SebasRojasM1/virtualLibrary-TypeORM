import { BookEntity } from 'src/models/books/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameCustomer: string;

  @Column()
  price: number;

  @ManyToOne(() => BookEntity, book => book.sales)
  book: BookEntity;
}
