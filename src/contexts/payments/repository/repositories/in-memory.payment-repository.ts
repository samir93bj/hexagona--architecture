import { Payment, PrimitivePayment } from '../../domain/payment';
import { PaymentRepository } from '../../domain/payment.repository';

export class InMemoryPaymentRepository implements PaymentRepository {
  private payments: PrimitivePayment[] = [];

  async create(payment: Payment): Promise<void> {
    this.payments.push(payment.toPrimitives());
  }

  async getById(paymentId: string): Promise<Payment | null> {
    const payment = this.payments.find(({ id }) => id === paymentId);
    return payment ? new Payment(payment) : null;
  }
}
