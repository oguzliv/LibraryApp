import { Column, Entity, OneToMany } from "typeorm";
import { Borrowing } from "./Borrowing";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class Book extends BaseEntity{
    @Column()
    name: string;
    @Column({type: 'decimal', precision: 6, scale:2, nullable: true})
    score: number;

    @OneToMany(() => Borrowing, borrowing => borrowing.book)
    borrowings: Borrowing[];
}