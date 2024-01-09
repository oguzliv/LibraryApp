import { Column, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";

export abstract class Borrowing {

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