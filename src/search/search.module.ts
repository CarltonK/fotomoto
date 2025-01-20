import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { FirebaseModule } from './../firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './../photos/entities/photo.entity';
import { User } from './../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, User]), FirebaseModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
