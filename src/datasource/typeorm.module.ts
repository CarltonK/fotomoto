import { DataSource } from 'typeorm';
import { Global, Inject, Module } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [ConfigService, WINSTON_MODULE_PROVIDER],
      useFactory: async (configService: ConfigService, logger: Logger) => {
        try {
          const dataSource = new DataSource({
            type: 'postgres',
            url: configService.get<string>('DATABASE_URL'),
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
          });

          await dataSource.initialize();
          logger.info('Database connected successfully', {
            context: 'TypeOrmModule',
          });

          return dataSource;
        } catch (error) {
          logger.error('Error connecting to the database', {
            context: 'TypeOrmModule',
            error: error.message,
          });
          throw error;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeOrmModule {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
  ) {
    this._logger.info('Initializing database connection', {
      context: 'TypeOrmModule',
    });
  }
}
