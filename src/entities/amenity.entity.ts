import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accommodation } from './accommodation.entity';

@Entity('amenities')
export class Amenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  has_wifi: boolean;

  @Column({ default: false })
  has_balcony: boolean;

  @Column({ default: false })
  has_parking_space: boolean;

  @Column({ default: false })
  has_elevator: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Accommodation, (accommodation) => accommodation.amenity)
  @JoinColumn()
  accommodation: Accommodation;
}
