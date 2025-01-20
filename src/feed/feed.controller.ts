import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { FirebaseAuthGuard } from './../auth/guard/firebase-auth.guard';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(@Inject(FeedService) private readonly feedService: FeedService) {}
  @UseGuards(FirebaseAuthGuard)
  @Get()
  @HttpCode(200)
  async fetchFeed(@Req() req: any, @Res() res: Response) {
    const { uid } = req.user;
    const feed = await this.feedService.fetchFeed(uid);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Feed retrieved successfully',
      feed,
    });
  }
}
