import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../domain/User';
import { AvailabilitySlot, Certificate, PortfolioItem, Review, Service } from '../domain/User';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ nullable: true })
  profilePhotoUrl?: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'float', nullable: true })
  starRating?: number;

  @Column({ type: 'int', nullable: true })
  completedJobs?: number;

  @Column({ type: 'json', nullable: true })
  services?: Service[];

  @Column({ type: 'json', nullable: true })
  availability?: AvailabilitySlot[];

  @Column({ type: 'json', nullable: true })
  portfolio?: PortfolioItem[];

  @Column({ nullable: true })
  insuranceStatus?: string;

  @Column({ type: 'json', nullable: true })
  certificates?: Certificate[];

  @Column({ type: 'json', nullable: true })
  reviews?: Review[];

  @Column({ type: 'simple-array', nullable: true })
  languagesSpoken?: string[];
}
