import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { FirebaseModule } from './../firebase/firebase.module';
import { AuthService } from './auth.service';
import { mockLoggerProvider } from './../utils/test/mock-logger';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [FirebaseModule, TypeOrmModule.forFeature([User])],
      controllers: [AuthController],
      providers: [mockLoggerProvider, AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
