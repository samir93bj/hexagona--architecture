import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { Payment, PrimitivePayment } from '../../domain/payment';
import { PaymentRepository } from '../../domain/payment.repository';
import { CreatePaymentDto } from './create-payment.dto';

@Injectable()
export class CreatePaymentUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(
    createPaymentDto: CreatePaymentDto,
  ): Promise<{ payment: PrimitivePayment }> {
    const payment = Payment.create(createPaymentDto);

    await this.paymentRepository.create(payment);

    return {
      payment: payment.toPrimitives(),
    };
  }
}
