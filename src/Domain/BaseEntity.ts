import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    createdAt: Date;

    @Column()
    createdBy: string;

    @Column()
    updatedAt: Date;

    @Column()
    updatedBy: string;

}