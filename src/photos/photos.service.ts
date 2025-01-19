import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotosService {
  create(createPhotoDto: CreatePhotoDto) {
    return 'This action adds a new photo';
  }
}
