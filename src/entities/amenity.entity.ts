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

@Entity()
export class Amenity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  has_wifi: boolean;

  @Column()
  has_balcony: boolean;

  @Column()
  has_parking_space: boolean;

  @Column()
  has_elevator: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Accommodation, (accommodation) => accommodation.amenity)
  @JoinColumn()
  accommodation: Accommodation;
}
