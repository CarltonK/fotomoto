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
import { AuthUserDto } from '../users/dto/auth-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(201)
  @Header('Content-Type', 'application/json')
  async createUser(@Res() res: Response, @Body() userDto: AuthUserDto) {
    const user = await this.authService.createUser(userDto);
    return res.status(HttpStatus.CREATED).json({
      status: true,
      message: 'User account created successfully',
      user,
    });
  }

  @Post('login')
  @HttpCode(200)
  @Header('Content-Type', 'application/json')
  async authenticateUser(@Res() res: Response, @Body() userDto: AuthUserDto) {
    const token = await this.authService.authenticateUser(userDto);
    return res.status(HttpStatus.OK).json({
      status: true,
      message: 'User account authenticated successfully',
      token,
    });
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('logout')
  @HttpCode(204)
  @Header('Content-Type', 'application/json')
  async unauthenticateUser(@Res() res: Response) {
    await this.authService.unauthenticateUser();
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
