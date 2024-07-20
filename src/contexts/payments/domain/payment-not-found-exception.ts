export class PaymentNotFoundException extends Error {
  constructor(id: string) {
    super(`Payment with id ${id} not found`);
  }
}
