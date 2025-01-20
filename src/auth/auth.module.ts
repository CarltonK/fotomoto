import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { FirebaseModule } from './../firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';

@Module({
  imports: [FirebaseModule, TypeOrmModule.forFeature([User])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
