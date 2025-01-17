import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as path from 'path';
import sharp from 'sharp';

@Injectable()
export class SharpPipe implements PipeTransform<any[], Promise<any[]>> {
  async transform(images: any[]): Promise<any[]> {
    if (!Array.isArray(images)) {
      throw new BadRequestException('Expected an array of files');
    }

    const processedFiles = await Promise.all(
      images.map(async (image) => {
        if (!image.buffer) {
          throw new BadRequestException('File buffer is missing');
        }

        const originalName = path.parse(image.originalname).name;
        const filename = Date.now() + '-' + originalName + '.webp';

        try {
          // Process the image with sharp
          const buffer = await sharp(image.buffer)
            .resize(800)
            .webp({ quality: 65 })
            .toBuffer();

          return {
            ...image,
            buffer, // Replace original buffer with processed buffer
            filename,
          };
        } catch (error) {
          throw new BadRequestException(
            `Failed to process image: ${error.message}`,
          );
        }
      }),
    );

    return processedFiles;
  }
}
