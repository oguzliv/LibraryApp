import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";
import { BaseEntity } from "./BaseEntity";
@Entity()
export class Borrowing extends BaseEntity{

    @Column()
    returnedAt: Date;

    @Column()
    borrowedAt: Date;

    @Column()
    updatedBy: string;

    @ManyToOne(() => User, user => user.borrowings)
    @JoinColumn({ name: 'UserId' })
    user: User;

    @ManyToOne(() => Book, book => book.borrowings)
    @JoinColumn({ name: 'BookId' })
    book: Book;
}