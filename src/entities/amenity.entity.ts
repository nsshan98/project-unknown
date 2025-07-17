import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Accommodation } from "./accommodation.entity";

@Entity()
export class Amenity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    hasWifi: boolean;

    @Column()
    hasBalcony: boolean;

    @Column()
    parkingSpaces: boolean;

    @Column()
    elevator: boolean;

    @OneToOne(() => Accommodation, (accommodation) =>accommodation.amenity )
    @JoinColumn()
    accommodation: Accommodation;
}