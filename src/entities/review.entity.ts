import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

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
}