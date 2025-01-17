import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from './datasource/typeorm.module';
import configuration from './utils/config/configuration';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './utils/logging/winston.config';
import { UsersModule } from './users/users.module';
import { PhotosModule } from './photos/photos.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { SearchModule } from './search/search.module';
import { FeedModule } from './feed/feed.module';
import { GcsModule } from './gcs/gcs.module';

@Module({
  imports: [
    // Global Config Module
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration],
    }),
    // Global Logger Module
    WinstonModule.forRoot(winstonConfig),
    TypeOrmModule,
    UsersModule,
    PhotosModule,
    AuthModule,
    FirebaseModule,
    SearchModule,
    FeedModule,
    GcsModule,
  ],
  controllers: [AppController],
  providers: [AppService, AllExceptionsFilter],
})
export class AppModule {}
