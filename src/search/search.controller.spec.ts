import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { FirebaseModule } from './../firebase/firebase.module';
import { SearchService } from './search.service';
import { mockLoggerProvider } from './../utils/test/mock-logger';

describe('SearchController', () => {
  let controller: SearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule],
      controllers: [SearchController],
      providers: [mockLoggerProvider, SearchService],
    }).compile();

    controller = module.get<SearchController>(SearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
