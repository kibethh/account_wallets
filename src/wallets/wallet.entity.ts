import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { Money } from 'src/money/money.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  accountNumber: string;
  // Relations
  @OneToMany(() => Money, (money) => money.wallet)
  money: Money[];
  @ManyToOne(() => User, (user) => user.wallets)
  user: User;
}
