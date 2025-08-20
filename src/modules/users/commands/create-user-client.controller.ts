import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../database/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../domain/User';

@Controller('user-client')
export class UserClientController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto): Promise<void> {
    const { name, email, password } = dto;
    const existing = await this.userRepository.findOne({ where: { email } });
    if (existing) {
      throw new ConflictException('Email already in use');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      role: Role.CLIENT,
    });
    await this.userRepository.save(user);
  }
}
