import { NotFoundException } from '@nestjs/common';

export class PaymentNotFoundException extends NotFoundException {
  constructor(id: string) {
    super(`Payment with id ${id} not found`);
  }
}
