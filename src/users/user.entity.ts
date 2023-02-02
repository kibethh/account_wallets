import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Wallet } from 'src/wallets/wallet.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  password: string;

  // Relations
  @OneToMany(() => Wallet, (wallet) => wallet.user)
  wallets: Wallet[];
}
