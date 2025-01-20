import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './../photos/entities/photo.entity';
import { User } from './../users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async fetchFeed(uid: string, page: number, limit: number) {
    page = page > 0 ? page : 1;
    limit = limit > 0 ? limit : 10;
    const offset = (page - 1) * limit;

    const user = await this.userRepository.findOne({
      where: { uid },
      relations: ['following'],
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const followingUids = user.following.map((u) => u.uid);

    // Include current users own UID
    const userAndFollowingUids = [...followingUids, uid];

    const photos = await this.photoRepository
      .createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'user')
      .select([
        'photo.id',
        'photo.url',
        'photo.createdAt',
        'photo.tags',
        'photo.description',
        'user.username',
        'user.createdAt',
      ])
      .where('user.uid IN (:...uids)', { uids: userAndFollowingUids })
      .orderBy('photo.createdAt', 'DESC')
      .skip(offset)
      .take(limit)
      .getMany();

    return photos;
  }
}
