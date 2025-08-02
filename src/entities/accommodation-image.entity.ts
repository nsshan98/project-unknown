import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity('accommodation_images')
export class AccommodationImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image_url: string;

  @Column()
  caption: string;

  @Column()
  sort_order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Accommodation,
    (accommodation) => accommodation.accommodation_image,
  )
  accommodation: Accommodation;
}
