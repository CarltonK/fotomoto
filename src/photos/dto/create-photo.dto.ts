import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreatePhotoDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  tags?: undefined | string[];
}
