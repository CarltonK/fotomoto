import { Module } from '@nestjs/common';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FirebaseModule } from './../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
