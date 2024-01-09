import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    createdAt: Date;

    @Column({nullable: true})
    createdBy: string;

    @Column({nullable: true})
    updatedAt: Date;

    @Column({nullable: true})
    updatedBy: string;

}