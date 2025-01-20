import { Inject, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GcsService {
  private storage: Storage;
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
    @Inject(ConfigService) private readonly _configService: ConfigService,
  ) {
    this.storage = new Storage({
      projectId: process.env.GOOGLE_CLOUD_PROJECT,
    });
    this._logger.info('Storage initialized', { context: GcsService.name });
  }

  initializeGcs() {
    return this.storage.bucket(
      `${this._configService.get<string>('WORKSPACE')}-photos`,
    );
  }
}
