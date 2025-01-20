import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { FirebaseModule } from './../firebase/firebase.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './../photos/entities/photo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Photo]), FirebaseModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
