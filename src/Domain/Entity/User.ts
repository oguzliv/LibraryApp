import { Column, Entity, OneToMany } from "typeorm";
import { Borrowing } from "./Borrowing";
import { BaseEntity } from "./BaseEntity";

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(() => Borrowing, borrowing => borrowing.user)
    borrowings: Borrowing[];
}