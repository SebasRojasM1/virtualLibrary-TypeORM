import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AuthorEntity } from '../../author/entities/author.entity';
import { SaleEntity } from '../../sales/entities/sale.entity';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @ManyToOne(() => AuthorEntity, author => author.books)
  @JoinColumn({ name: 'author_Id' }) 
  author: AuthorEntity;

  @OneToMany(() => SaleEntity, sale => sale.book)
  sales: SaleEntity[];
}