import { IsInt, IsNumber } from 'class-validator';

export class AddMoneyDto {
  @IsNumber()
  amount: number;
  @IsInt()
  walletId: number;
}
