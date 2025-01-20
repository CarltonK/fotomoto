import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './../photos/entities/photo.entity';
import { Like, Repository } from 'typeorm';
import { User } from './../users/entities/user.entity';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async fetchUsersByUsername(username: string) {
    return this.userRepository.find({
      where: {
        username: Like(`%${username}%`),
      },
      select: {
        username: true,
        photos: { id: true, url: true, createdAt: true },
      },
      relations: ['photos'],
    });
  }

  async fetchPhotosByKeyword(keyword: string, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [photos, total] = await this.photoRepository.findAndCount({
      where: [
        { tags: Like(`%${keyword}%`) },
        { description: Like(`%${keyword}%`) },
      ],
      skip,
      take: limit,
    });

    return {
      photos,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    };
  }
}
