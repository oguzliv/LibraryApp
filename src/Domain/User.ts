import { BaseEntity } from "Domain/BaseEntity";
import { Column, Entity, OneToMany } from "typeorm";
import { Borrowing } from "./Borrowing";

@Entity()
export class User extends BaseEntity {
    @Column()
    name: string;

    @OneToMany(() => Borrowing, borrowing => borrowing.user)
    borrowings: Borrowing[];
    
}