import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { rawBody: true });

  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb', extended: true }));

  /*
   * Global FIlters
   */
  // Exception
  const errorToWorkerFilter = app.get(AllExceptionsFilter);
  app.useGlobalFilters(errorToWorkerFilter);

  /*
   * Global Pipes
   */
  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) =>
        new BadRequestException(
          `${errors.map((err) => Object.values(err.constraints))}`,
        ),
      transform: true,
      stopAtFirstError: true,
      skipMissingProperties: true,
    }),
  );

  /*
   * Security
   */
  app.enableCors();

  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('PORT'));
}
bootstrap();
