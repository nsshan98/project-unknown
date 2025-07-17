import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accommodation } from "./accommodation.entity";
import { Review } from "./review.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phoneNumber: string;

    @Column()
    userAvatar: string;

    @Column({default: 'User'})
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Accommodation, (accommodation) => accommodation.user)
    accommodations: Accommodation[];

    @ManyToMany(() => Review, (review) => review.reviewedBy)
    @JoinColumn({ name: 'user_reviews' })
    reviewedUsers: Review[];
}