import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  constructor() {}

  async fetchUsersByUsername(username: string) {
    return username;
  }

  async fetchPhotosByKeyword(keyword: string) {
    return keyword;
  }
}
