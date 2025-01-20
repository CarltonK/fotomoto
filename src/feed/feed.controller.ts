import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Query,
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
  async fetchFeed(
    @Req() req: any,
    @Res() res: Response,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    const { uid } = req.user;

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    const feed = await this.feedService.fetchFeed(uid, pageNumber, limitNumber);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Feed retrieved successfully',
      feed,
    });
  }
}
