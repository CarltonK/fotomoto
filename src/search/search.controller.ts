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
  async fetchPhotosByKeywords(
    @Res() res: Response,
    @Query('keyword') keyword: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    if (!keyword) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: 'Keyword must be provided',
      });
    }

    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;

    if (pageNumber < 1 || limitNumber < 1) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        status: false,
        message: 'Page and limit must be positive integers',
      });
    }

    const photos = await this.searchService.fetchPhotosByKeyword(
      keyword,
      pageNumber,
      limitNumber,
    );
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Photos retrieved successfully',
      photos,
    });
  }
}
