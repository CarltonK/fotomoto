import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  UseGuards,
  Res,
  Req,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  Param,
  ParseIntPipe,
  UploadedFiles,
  Header,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FirebaseAuthGuard } from './../auth/guard/firebase-auth.guard';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { SharpPipe } from './../pipes/sharp.pipe';
import { CommentDto } from './dto/post-comment.dto';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @UseGuards(FirebaseAuthGuard)
  @UseInterceptors(FilesInterceptor('photo'))
  @Post('/upload')
  @Header('Content-Type', 'application/json')
  @HttpCode(200)
  async uploadPhotos(
    @Req() req: any,
    @Res() res: Response,
    @UploadedFiles(SharpPipe) files: any[],
  ) {
    const { uid } = req.user;
    const photos = await this.photosService.uploadPhotos(uid, files);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Photo uploaded successfully',
      photos,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Get()
  @HttpCode(200)
  async fetchPhotos(@Req() req: any, @Res() res: Response) {
    const { uid } = req.user;
    const photos = await this.photosService.fetchPhotos(uid);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Photos retrieved successfully',
      photos,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Delete('/:id')
  @HttpCode(204)
  async deletePhoto(
    @Req() req: any,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { uid } = req.user;
    await this.photosService.deletePhoto(uid, id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('/:id/like')
  @HttpCode(200)
  async likePhoto(
    @Req() req: any,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const { uid } = req.user;
    await this.photosService.likePhoto(uid, id);

    return res.status(HttpStatus.OK).json({
      status: true,
      message: ``,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('/:id/comment')
  @HttpCode(200)
  async commentOnPhoto(
    @Req() req: any,
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CommentDto,
  ) {
    const { uid } = req.user;
    await this.photosService.commentOnPhoto(uid, id, dto);

    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Comments created successfully',
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('/:id')
  @HttpCode(200)
  async fetchPhoto(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const photo = await this.photosService.fetchSinglePhoto(id);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'Photo retrieved successfully',
      photo,
    });
  }
}
