import { Expose, Exclude } from 'class-transformer';
import { Wallet } from 'src/wallets/wallet.entity';

export class UserDto {
  @Expose()
  id: number;
  @Expose()
  email: string;
  @Exclude()
  password: string;
  @Expose()
  wallets: Wallet[];
}
