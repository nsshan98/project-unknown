import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Amenity } from './amenity.entity';
import { Review } from './review.entity';
import { AccommodationImage } from './accommodation-image.entity';

@Entity('accommodations')
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
  image: string;

  @Column()
  bedrooms: number;

  @Column()
  bathrooms: number;

  @Column()
  price_per_night: number;

  @Column()
  max_guests: number;

  @Column()
  check_in_time: Date;

  @Column()
  check_out_time: Date;

  @Column()
  location: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Amenity, (amenity) => amenity.accommodation, {
    cascade: true,
  })
  amenity: Amenity;

  @ManyToOne(() => User, (user) => user.accommodations)
  user: User;

  @ManyToMany(() => Review, (review) => review.accommodations)
  reviews: Review[];

  @OneToMany(
    () => AccommodationImage,
    (accommodationImage) => accommodationImage.accommodation,
  )
  accommodation_image: AccommodationImage[];
}
