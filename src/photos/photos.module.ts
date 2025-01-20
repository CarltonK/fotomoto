import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { FirebaseModule } from './../firebase/firebase.module';
import { GcsModule } from './../gcs/gcs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { User } from './../users/entities/user.entity';
import { Like } from './entities/likes.entity';
import { Comment } from './entities/comments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo, User, Like, Comment]),
    FirebaseModule,
    GcsModule,
  ],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
