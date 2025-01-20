import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty({ message: 'Email Address must be provided' })
  emailAddress: string;

  @IsString()
  @IsNotEmpty({ message: 'Password must be provided' })
  password: string;
}
