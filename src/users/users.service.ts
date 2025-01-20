import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  async fetchProfile(username: string) {
    return username;
  }

  async updateUserProfile(uid: string) {
    return uid;
  }

  async fetchUserNotifications(uid: string) {
    return uid;
  }

  async followProfile(uid: string, id: number) {
    return { uid, id };
  }

  async unfollowProfile(uid: string, id: number) {
    return { uid, id };
  }
}
