import { Module } from '@nestjs/common';
import { PaymentModule } from './contexts/payments/repository/payment.module';

@Module({
  imports: [PaymentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
