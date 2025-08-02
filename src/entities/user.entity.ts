import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Accommodation } from "./accommodation.entity";
import { Review } from "./review.entity";
import * as bcrypt from 'bcrypt';
import { Role } from "src/auth/enum/role.enum";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ type: 'text', nullable: true })
    hashed_refresh_token: string | null;

    @Column({nullable: true})
    phone_number: string;

    @Column({nullable: true})
    user_avatar: string;

    @Column({
      type: 'enum',
      enum: Role,
      default: Role.USER,
    })
    role: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany(() => Accommodation, (accommodation) => accommodation.user)
    accommodations: Accommodation[];

    @ManyToMany(() => Review, (review) => review.reviewed_by)
    @JoinTable({ name: 'user_reviews' })
    reviewed_users: Review[];

    @BeforeInsert()
    async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);
    }
}