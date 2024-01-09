import { BaseEntity } from "Domain/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { Borrowing } from "./Borrowing";

@Entity()
export class Book extends BaseEntity{
    @Column()
    name: string;
    @Column()
    score: number;

    @OneToMany(() => Borrowing, borrowing => borrowing.book)
    borrowings: Borrowing[];
}