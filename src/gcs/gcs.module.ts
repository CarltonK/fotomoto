import { Module } from '@nestjs/common';
import { GcsService } from './gcs.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from './../logging/logging.module';

@Module({
  imports: [LoggerModule, ConfigModule],
  providers: [GcsService],
  exports: [GcsService],
})
export class GcsModule {}
