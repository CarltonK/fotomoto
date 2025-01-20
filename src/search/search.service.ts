import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './../photos/entities/photo.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async fetchUsersByUsername(username: string) {
    return username;
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
