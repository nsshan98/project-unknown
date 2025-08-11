import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  type: string;

  @Column('json')
  image: {
    image_url: string;
    image_public_id: string;
  };

  @Column()
  bedrooms: number;

  @Column()
  has_high_commode: boolean;

  @Column()
  price_per_night: number;

  @Column()
  max_guests: number;

  @Column({ nullable: true })
  check_in_time?: Date;

  @Column({ nullable: true })
  check_out_time?: Date;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Amenity, (amenity) => amenity.accommodation, {
    cascade: true,
    eager: true
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
