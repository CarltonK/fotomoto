import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  @IsNotEmpty({ message: 'Comment text must be provided' })
  text: string;
}
