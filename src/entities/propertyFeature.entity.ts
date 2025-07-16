import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./property.entity";

@Entity()
export class PropertyFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    bedrooms: number;

    @Column()
    bathrooms: number;

    @Column()
    area: number;

    @Column()
    floorNumber: number;

    @Column()
    hasBalcony: boolean;

    @Column()
    parkingSpaces: boolean;

    @Column()
    elevator: boolean;

    @OneToOne(() => Property, (property) =>property.propertyFeature )
    @JoinColumn()
    property: Property;
}