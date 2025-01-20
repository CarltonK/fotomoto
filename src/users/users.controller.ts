import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FirebaseAuthGuard } from './../auth/guard/firebase-auth.guard';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(FirebaseAuthGuard)
  @Put('/:username')
  @HttpCode(200)
  async fetchProfile(@Req() req: any, @Res() res: Response) {
    const { uid } = req.user;
    const profile = await this.usersService.fetchProfile(uid);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Profile retrieved successfully',
      profile,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Put('/me')
  @HttpCode(200)
  async updateUserProfile(@Req() req: any, @Res() res: Response) {
    const { uid } = req.user;
    await this.usersService.updateUserProfile(uid);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Profile retrieved successfully',
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Put('/me/notifications')
  @HttpCode(200)
  async fetchUserNotifications(@Req() req: any, @Res() res: Response) {
    const { uid } = req.user;
    const notifications = await this.usersService.fetchUserNotifications(uid);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'User notifications retrieved successfully',
      notifications,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('/:id/follow')
  @HttpCode(200)
  async followProfile(
    @Req() req: any,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { uid } = req.user;
    await this.usersService.followProfile(uid, id);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Profile followed successfully',
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete('/:id/unfollow')
  @HttpCode(200)
  async unfollowProfile(
    @Req() req: any,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { uid } = req.user;
    await this.usersService.unfollowProfile(uid, id);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Profile unfollowed successfully',
    });
  }
}
