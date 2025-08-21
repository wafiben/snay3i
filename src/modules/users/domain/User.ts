export enum Role {
  FREELANCER = 'FREELANCER',
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
}

export interface Service {
  name: string; // e.g., "Toilet Repair"
  laborPrice: number;
  estimatedMaterialCost: number;
  notes?: string; // e.g., "Material cost may vary"
}

export interface AvailabilitySlot {
  day: string; // e.g., "Monday"
  timeSlots: string[]; // e.g., ["09:00-10:00", "14:00-15:00"]
}

export interface PortfolioItem {
  beforePhotoUrl: string;
  afterPhotoUrl?: string;
  videoUrl?: string;
  description?: string;
}

export interface Certificate {
  title: string; // e.g., "Plumbing License"
  issuer: string;
  issuedAt: Date;
}

export interface Review {
  clientName: string;
  rating: number; // 1-5
  comment: string;
  breakdown?: {
    punctuality: number;
    quality: number;
    priceFairness: number;
  };
}

export class UserModel {
  id: string;
  name: string; 
  email: string;
  password: string;
  role: Role;
  profilePhotoUrl?: string;
  isVerified: boolean;

  starRating?: number;
  completedJobs?: number;
  services?: Service[];
  availability?: AvailabilitySlot[];
  portfolio?: PortfolioItem[];
  insuranceStatus?: string;
  certificates?: Certificate[];
  reviews?: Review[];
  languagesSpoken?: string[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    role: Role,
    isVerified: boolean = false,
    profilePhotoUrl?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isVerified = isVerified;
    this.profilePhotoUrl = profilePhotoUrl;
  }
}
