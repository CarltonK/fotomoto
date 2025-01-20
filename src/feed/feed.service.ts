import { Injectable } from '@nestjs/common';

@Injectable()
export class FeedService {
  async fetchFeed(uid: string) {
    return uid;
  }
}
