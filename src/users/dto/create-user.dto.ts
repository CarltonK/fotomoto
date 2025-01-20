import { IsNotEmpty, IsString } from 'class-validator';
import { AuthUserDto } from './auth-user.dto';

export class CreateUser extends AuthUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username must be provided' })
  username: string;
}
