import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { User } from "./User";
import { Book } from "./Book";
import { BaseEntity } from "./BaseEntity";
@Entity()
export class Borrowing extends BaseEntity{

    @Column({select: false,nullable: true})
    returnedAt: Date;

    @Column({select:false,nullable: true})
    borrowedAt: Date;

    @Column({select:false})
    returned: boolean

    @ManyToOne(() => User, user => user.borrowings)
    @JoinColumn({ name: 'UserId' })
    user: User;

    @ManyToOne(() => Book, book => book.borrowings)
    @JoinColumn({ name: 'BookId' })
    book: Book;
}