import { Column, PrimaryGeneratedColumn } from "typeorm";

export abstract class BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({select: false})
    createdAt: Date;

    @Column({nullable: true,select: false})
    createdBy: string;

    @Column({nullable: true,select: false})
    updatedAt: Date;

    @Column({nullable: true,select: false})
    updatedBy: string;

}