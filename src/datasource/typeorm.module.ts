import { DataSource } from 'typeorm';
import { Global, Module } from '@nestjs/common';
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
          logger.info('Initializing database connection...', {
            context: 'TypeOrmModule',
          });

          const databaseUrl = configService.get<string>('DATABASE_URL');
          const env = configService.get<string>('NODE_ENV');

          if (!databaseUrl) {
            throw new Error(
              'DATABASE_URL is not defined in the environment variables',
            );
          }

          const dataSource = new DataSource({
            type: 'postgres',
            url: databaseUrl,
            entities: [`${__dirname}/../**/**.entity{.ts,.js}`],
            synchronize: env === 'production' ? false : true,
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
export class TypeOrmModule { }
