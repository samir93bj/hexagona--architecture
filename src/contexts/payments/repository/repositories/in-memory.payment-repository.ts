import { Payment, PrimitivePaymentValueObject } from '../../domain/payment';
import { PaymentRepository } from '../../domain/payment.repository';

export class InMemoryPaymentRepository implements PaymentRepository {
  private payments: PrimitivePaymentValueObject[] = [];

  async create(payment: Payment): Promise<void> {
    this.payments.push(payment.toValue());
  }

  async getById(paymentId: string): Promise<Payment | null> {
    const payment = this.payments.find(({ id }) => id === paymentId);
    return payment ? new Payment(payment) : null;
  }
}
