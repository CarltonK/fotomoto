import { Injectable } from '@nestjs/common';

@Injectable()
export class PhotosService {
  constructor() {}

  async uploadPhotos(uid: string) {
    return uid;
  }

  async fetchPhotos(uid: string) {
    return uid;
  }

  async fetchSinglePhoto(uid: string, id: number) {
    return { uid, id };
  }

  async deletePhoto(uid: string, id: number) {
    return { uid, id };
  }

  async likePhoto(uid: string, id: number, dto: any) {
    return { uid, id, dto };
  }

  async commentOnPhoto(uid: string, id: number, dto: any) {
    return { uid, id, dto };
  }
}
