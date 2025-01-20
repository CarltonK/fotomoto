import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { FirebaseModule } from './../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
