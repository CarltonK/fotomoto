import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { FirebaseModule } from './../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
