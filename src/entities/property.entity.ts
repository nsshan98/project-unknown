import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PropertyFeature } from "./propertyFeature.entity";

@Entity()
export class Property {
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

    @OneToOne(() => PropertyFeature, (propertyFeature) => propertyFeature.property, {cascade: true})
    propertyFeature: PropertyFeature;
}