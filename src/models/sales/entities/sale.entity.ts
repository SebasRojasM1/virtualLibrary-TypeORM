import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sale {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nameBook: string;

    @Column()
    nameCustomer: string;

    @Column()
    price: number;
}
