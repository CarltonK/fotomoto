import { Test, TestingModule } from '@nestjs/testing';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { FirebaseModule } from './../firebase/firebase.module';
import { mockLoggerProvider } from './../utils/test/mock-logger';

describe('PhotosController', () => {
  let controller: PhotosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule],
      controllers: [PhotosController],
      providers: [mockLoggerProvider, PhotosService],
    }).compile();

    controller = module.get<PhotosController>(PhotosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
