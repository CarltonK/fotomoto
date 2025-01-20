import { Test, TestingModule } from '@nestjs/testing';
import { PhotosService } from './photos.service';
import { FirebaseModule } from './../firebase/firebase.module';

describe('PhotosService', () => {
  let service: PhotosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule],
      providers: [PhotosService],
    }).compile();

    service = module.get<PhotosService>(PhotosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
