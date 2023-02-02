import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Wallet } from 'src/wallets/wallet.entity';

@Entity()
export class Money {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;
  // Relations
  @ManyToOne(() => Wallet, (wallet) => wallet.money)
  wallet: Wallet[];
}
