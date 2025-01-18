import {
  Body,
  Controller,
  Header,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { FirebaseAuthGuard } from './guard/firebase-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  createUser(@Res() res: Response, @Req() req: any) {
    const { uid, email } = req.user;
    return res.status(HttpStatus.CREATED).json({
      status: true,
      message: 'User account created successfully',
    });
  }

  @Post('login')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  authenticateUser(@Res() res: Response, @Req() req: any) {
    const { uid } = req.user;
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'User account authenticated successfully',
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('logout')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  unauthenticateUser(@Res() res: Response, @Req() req: any) {
    const { uid } = req.user;
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
