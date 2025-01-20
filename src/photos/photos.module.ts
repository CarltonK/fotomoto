import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { FirebaseModule } from './../firebase/firebase.module';
import { GcsModule } from './../gcs/gcs.module';

@Module({
  imports: [FirebaseModule, GcsModule],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
