import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Amenity } from './amenity.entity';
import { Review } from './review.entity';

@Entity()
export class Accommodation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  type: string;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  pricePerNight: number;

  @Column()
  maxGuests: number;

  @Column()
  checkInTime: Date;

  @Column()
  checkOutTime: Date;

  @Column()
  location: string;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @OneToOne(() => Amenity, (amenity) => amenity.accommodation, {
    cascade: true,
  })
  amenity: Amenity;

  @ManyToOne(() => User, (user) => user.accommodations)
  user: User;
  
  @ManyToMany(() => Review, (review) => review.accommodations)
  reviews: Review[];
}
