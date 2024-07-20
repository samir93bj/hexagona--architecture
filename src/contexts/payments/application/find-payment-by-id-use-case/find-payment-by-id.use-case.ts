import { Injectable } from '@nestjs/common';
import { PrimitivePayment } from '../../domain/payment';
import { PaymentRepository } from '../../domain/payment.repository';
import { FindPaymentByIdDto } from './find-payment-by-id.dto';
import { PaymentNotFoundException } from '../../domain/payment-not-found-exception';

@Injectable()
export class FindPaymentByIdUseCase {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async execute(
    findPaymentByIdDto: FindPaymentByIdDto,
  ): Promise<{ payment: PrimitivePayment }> {
    const payment = await this.paymentRepository.getById(findPaymentByIdDto.id);

    if (!payment) throw new PaymentNotFoundException(findPaymentByIdDto.id);

    return { payment: payment.toPrimitives() };
  }
}
