import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async fetchProfile(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) {
      throw new NotFoundException(`User with username "${username}" not found`);
    }
    return user;
  }

  async updateUserProfile(uid: string) {
    return uid;
  }

  async fetchUserNotifications(uid: string) {
    return uid;
  }

  async followProfile(uid: string, id: number) {
    return { uid, id };
  }

  async unfollowProfile(uid: string, id: number) {
    return { uid, id };
  }
}
