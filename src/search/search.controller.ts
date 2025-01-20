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
import { SearchService } from './search.service';
import { FirebaseAuthGuard } from './../auth/guard/firebase-auth.guard';
import { Response } from 'express';

@Controller('search')
export class SearchController {
  constructor(
    @Inject(SearchService) private readonly searchService: SearchService,
  ) {}

  @UseGuards(FirebaseAuthGuard)
  @Get('/users')
  @HttpCode(200)
  async fetchUsersByUsername(@Req() req: any, @Res() res: Response) {
    const { uid } = req.user;
    const user = await this.searchService.fetchUsersByUsername(uid);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Profile retrieved successfully',
      user,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('/photos')
  @HttpCode(200)
  async fetchPhotosByKeywords(@Req() req: any, @Res() res: Response) {
    const { uid } = req.user;
    const photos = await this.searchService.fetchPhotosByKeyword(uid);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Photos retrieved successfully',
      photos,
    });
  }
}
