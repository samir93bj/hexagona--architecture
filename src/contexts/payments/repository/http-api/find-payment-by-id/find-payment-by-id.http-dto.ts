import { IsNotEmpty, IsString } from 'class-validator';

export class FindPaymentByIdHttpDto {
  @IsString()
  @IsNotEmpty()
  id: string;
}
