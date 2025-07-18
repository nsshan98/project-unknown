import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Accommodation } from "./accommodation.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @Column()
    wouldRecommend:boolean;

    @ManyToMany(() => User, (user) => user.reviewedUsers)
    reviewedBy: User[];

    @ManyToMany(() => Accommodation, (accommodation) => accommodation.reviews)
    accommodations: Accommodation[];
}