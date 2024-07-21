import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app/app.module';
import { API } from './app/http-api/routes/routes-constants';
import { NestLoggerService } from './contexts/shared/logger/infraestructura/nestjs.logger-service';
import { ErrorResponseNormalizerFilter } from './app/http-api/response-normalizer/error-response-normalizer.filter';
import { SuccessResponseNormalizerInterceptor } from './app/http-api/response-normalizer/success-response-normalizer.interceptor';

import { Logger } from './contexts/shared/logger/domain';
import { LoggerInterceptor } from './contexts/shared/logger/infraestructura/logger.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { bufferLogs: true },
  );

  app.useLogger(app.get(NestLoggerService));
  app.setGlobalPrefix(API);

  app.useGlobalFilters(app.get(ErrorResponseNormalizerFilter));
  app.useGlobalInterceptors(
    app.get(LoggerInterceptor),
    app.get(SuccessResponseNormalizerInterceptor),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT', '3000');
  const logger = app.get(Logger);

  await app.listen(port, '0.0.0.0');

  logger.info(`App is ready and listening on port ${port} 🚀`);
}
bootstrap().catch(handleError);

function handleError(error: unknown) {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
}

process.on('uncaughtException', handleError);
