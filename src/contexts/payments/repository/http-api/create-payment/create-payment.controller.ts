import { CreatePaymentUseCase } from 'src/contexts/payments/application/create-payment-use-case/create-payment-use-case';
import { Body, Controller, Post } from '@nestjs/common';
import { CreatePaymentHttpDto } from './create-payment.http-dto';
import { PrimitivePayment } from 'src/contexts/payments/domain/payment';

@Controller('payments')
export class CreatePaymentController {
  constructor(private createPaymentUseCase: CreatePaymentUseCase) {}

  @Post()
  async run(
    @Body() createPaymentdto: CreatePaymentHttpDto,
  ): Promise<{ payment: PrimitivePayment }> {
    return this.createPaymentUseCase.execute(createPaymentdto);
  }
}
