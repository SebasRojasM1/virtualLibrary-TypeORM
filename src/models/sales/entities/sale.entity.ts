import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SaleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameBook: string;

  @Column()
  nameCustomer: string;

  @Column()
  price: number;
}
