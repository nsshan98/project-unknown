import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accommodation } from "./accommodation.entity";
import { Review } from "./review.entity";
import * as bcrypt from 'bcrypt';

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

    @Column({nullable: true})
    phoneNumber: string;

    @Column({nullable: true})
    userAvatar: string;

    @Column({default: 'User'})
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Accommodation, (accommodation) => accommodation.user)
    accommodations: Accommodation[];

    @ManyToMany(() => Review, (review) => review.reviewedBy)
    @JoinTable({ name: 'user_reviews' })
    reviewedUsers: Review[];

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
}