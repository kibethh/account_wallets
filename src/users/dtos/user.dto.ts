import { Expose, Exclude } from 'class-transformer';
import { Wallet } from 'src/wallets/wallet.entity';

export class UserDto {
  @Expose()
  user_id: number;
  @Expose()
  user_email: string;
  @Exclude()
  user_password: string;
  @Expose()
  userWallets: Wallet[];
}
