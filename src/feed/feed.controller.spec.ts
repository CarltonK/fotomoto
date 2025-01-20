import { Test, TestingModule } from '@nestjs/testing';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { FirebaseModule } from './../firebase/firebase.module';
import { mockLoggerProvider } from './../utils/test/mock-logger';

describe('FeedController', () => {
  let controller: FeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule],
      controllers: [FeedController],
      providers: [mockLoggerProvider, FeedService],
    }).compile();

    controller = module.get<FeedController>(FeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
