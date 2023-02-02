import { IsString, IsInt } from 'class-validator';

export class CreateWalletDto {
  @IsString()
  accountNumber: string;
  @IsInt()
  userId: number;
}
