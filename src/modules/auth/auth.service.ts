import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../users/database/user.entity';
import { UserWorngPassword } from '../users/domain/errors/user-password.error';
import { UserNotFoundError } from '../users/domain/errors/user-not-found.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  userId: string;

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UserWorngPassword();
    }

    return user;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    this.userId = user.id;

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getProfile(authHeader: string) {
    if (!authHeader) throw new UnauthorizedException('No token provided');

    const token = authHeader.replace('Bearer ', '');
    const decoded = this.jwtService.verify(token);
    const userId = decoded.sub;

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
