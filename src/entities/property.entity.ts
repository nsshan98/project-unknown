import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropertyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    location: string;

    @Column()
    type: string;

    @Column()
    status: string;
}