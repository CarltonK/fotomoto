import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { Like } from './entities/likes.entity';
import { Comment } from './../photos/entities/comments.entity';
import { CommentDto } from './dto/post-comment.dto';
import { GcsService } from './../gcs/gcs.service';
import { v4 as uuidv4 } from 'uuid';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private readonly photoRepository: Repository<Photo>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @Inject(GcsService) private readonly _gcsService: GcsService,
  ) {}

  async uploadPhotos(uid: string, files: any[], dto: CreatePhotoDto) {
    const { description } = dto;

    let tags: undefined | string[] = undefined;
    tags = dto.tags;

    if (tags) {
      tags = JSON.parse(JSON.stringify(tags));
    }

    if (!files || (Array.isArray(files) && files.length < 1)) {
      throw new BadRequestException('Files to be uploaded must be provided');
    }

    // Check user in db
    const user = await this.userRepository.findOneBy({ uid });
    const { id: userId } = user;
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // File validation
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const maxFileSize = 5 * 1024 * 1024; // 5MB

    const bucket = this._gcsService.initializeGcs();
    // Batch GCS Upload
    const uploadPromises = files.map(async (file: any) => {
      // Type check
      if (!allowedMimeTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          `Invalid file type. Only ${allowedMimeTypes.join(', ')} are allowed.`,
        );
      }

      // Size Check
      if (file.size > maxFileSize) {
        throw new BadRequestException(`File size exceeds the limit of 5MB.`);
      }

      const filePath = `${uid}/${uuidv4()}_${file.originalname}`;
      const blob = bucket.file(filePath);
      const blobStream = blob.createWriteStream({ resumable: false });

      const uploadPromise = new Promise((resolve, reject) => {
        blobStream.on('error', (err) => reject(err));
        blobStream.on('finish', () => {
          const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
          resolve(publicUrl);
        });
        blobStream.end(Buffer.from(file.buffer, 'base64'));
      });

      const publicUrl: any = await uploadPromise;

      const photo = this.photoRepository.create({
        user: { id: userId },
        url: publicUrl,
        fileName: file.originalname,
        description,
        tags,
      });

      await this.photoRepository.save(photo);
      return publicUrl;
    });

    return await Promise.all(uploadPromises);
  }

  async fetchPhotos(uid: string): Promise<Photo[]> {
    return await this.photoRepository.find({
      where: { user: { uid } },
      order: { createdAt: 'DESC' },
      relations: ['user'],
    });
  }

  async fetchSinglePhoto(id: number) {
    const photo = await this.photoRepository.findOne({
      where: { id },
      relations: ['likes', 'comments', 'likes.user', 'comments.user'],
      select: {
        likes: { id: true, likedAt: true, user: { username: true } },
        comments: {
          id: true,
          text: true,
          commentedAt: true,
          user: { username: true },
        },
      },
    });

    const likesCount = photo.likes.length;
    const commentsCount = photo.comments.length;

    return { photo, likesCount, commentsCount };
  }

  async deletePhoto(uid: string, id: number): Promise<void> {
    const photo = await this.photoRepository.findOneBy({
      id,
      user: { uid },
    });

    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    // TODO: Delete from GCS

    await this.photoRepository.remove(photo);
  }

  async likePhoto(uid: string, id: number) {
    const user = await this.userRepository.findOneBy({ uid });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const photo = await this.photoRepository.findOneBy({ id });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    // Check if the like already exists
    const existingLike = await this.likeRepository.findOne({
      where: { user: { uid }, photo: { id } },
    });

    if (existingLike) {
      // Unlike the photo
      await this.likeRepository.remove(existingLike);
      return existingLike;
    }

    // Like the photo
    const like = this.likeRepository.create({
      user,
      photo,
    });
    await this.likeRepository.save(like);
    return existingLike;
  }

  async commentOnPhoto(
    uid: string,
    id: number,
    dto: CommentDto,
  ): Promise<void> {
    const user = await this.userRepository.findOneBy({ uid });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const photo = await this.photoRepository.findOneBy({ id });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    // Create commment
    const { text } = dto;
    const comment = this.commentRepository.create({
      user,
      photo,
      text,
    });
    await this.commentRepository.save(comment);
    return;
  }
}
