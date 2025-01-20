import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    // Current user
    const followingUser = await this.userRepository.findOne({
      where: { uid },
      relations: ['followers', 'following'],
    });

    // User to be followed
    const followedUser = await this.userRepository.findOne({
      where: { id },
      relations: ['followers', 'following'],
    });

    if (!followingUser || !followedUser) {
      throw new NotFoundException('User(s) not found');
    }

    // Avoid self following
    if (followingUser.id === followedUser.id) {
      throw new BadRequestException('You cannot follow yourself');
    }

    if (followingUser.following.some((user) => user.id === followedUser.id)) {
      throw new BadRequestException('You are already following this user');
    }

    followingUser.following.push(followedUser);
    followedUser.followers.push(followingUser);

    await this.userRepository.save(followingUser);
    await this.userRepository.save(followedUser);
  }

  async unfollowProfile(uid: string, id: number) {
    // Current user
    const followingUser = await this.userRepository.findOne({
      where: { uid },
      relations: ['followers', 'following'],
    });

    // User to be unfollowed
    const unfollowedUser = await this.userRepository.findOne({
      where: { id },
      relations: ['followers', 'following'],
    });

    if (!followingUser || !unfollowedUser) {
      throw new NotFoundException('User(s) not found');
    }

    // Check if following in first place
    if (
      !followingUser.following.some((user) => user.id === unfollowedUser.id)
    ) {
      throw new BadRequestException('You are not following this user');
    }

    // Remove the unfollowedUser from the followingUser's following list
    followingUser.following = followingUser.following.filter(
      (user) => user.id !== unfollowedUser.id,
    );

    // Remove the followingUser from the unfollowedUser's followers list
    unfollowedUser.followers = unfollowedUser.followers.filter(
      (user) => user.id !== followingUser.id,
    );

    await this.userRepository.save(followingUser);
    await this.userRepository.save(unfollowedUser);
  }
}
