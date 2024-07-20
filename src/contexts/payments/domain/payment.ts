import { v4 as uuidv4 } from 'uuid';

export interface PrimitivePayment {
  id: string;
  amount: number;
  customerId: string;
}

export class Payment {
  constructor(private readonly payment: PrimitivePayment) {}

  static create(createPayment: {
    amount: number;
    customerId: string;
  }): Payment {
    return new Payment({
      id: uuidv4(),
      amount: createPayment.amount,
      customerId: createPayment.customerId,
    });
  }

  toPrimitives(): PrimitivePayment {
    return {
      id: this.payment.id,
      amount: this.payment.amount,
      customerId: this.payment.customerId,
    };
  }
}
