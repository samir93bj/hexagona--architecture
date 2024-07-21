import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { HttpApiModule } from './http-api/http-api.modules';

import { LoggerModule } from '../contexts/shared/logger/infraestructura/logger.module';

import { PaymentModule } from '../contexts/payments/repository/payment.module';

@Module({
  imports: [
    HttpApiModule,
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    PaymentModule,
  ],
})
export class AppModule {}
