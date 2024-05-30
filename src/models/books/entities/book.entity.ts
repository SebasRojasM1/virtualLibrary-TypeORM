import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column()
  description: string;

  @ManyToOne(() => Author, author => author.books)
  author: Author;
    
  @OneToMany(() => Sale, sale => sale.book)
  sales: Sale[]; 
}
