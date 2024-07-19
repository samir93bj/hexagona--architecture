import { randomUUID } from 'crypto';

export interface PrimitiveValueObject {
  id: string;
  amount: number;
  customerId: string;
}

export class Payment {
  constructor(private readonly payment: PrimitiveValueObject) {}

  static create(createPayment: {
    ammount: number;
    customerId: string;
  }): Payment {
    return new Payment({
      id: randomUUID(),
      amount: createPayment.ammount,
      customerId: createPayment.customerId,
    });
  }

  toValue(): PrimitiveValueObject {
    return {
      id: this.payment.id,
      amount: this.payment.amount,
      customerId: this.payment.customerId,
    };
  }
}
