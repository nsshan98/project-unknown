import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PropertyFeatureEntity {
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
}