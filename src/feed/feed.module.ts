import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FirebaseModule } from './../firebase/firebase.module';
import { User } from './../users/entities/user.entity';
import { Photo } from './../photos/entities/photo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, User]), FirebaseModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
