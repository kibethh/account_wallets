import { IsString, IsInt } from 'class-validator';

export class UserWalletDto {
  @IsInt()
  userId: number;
}
