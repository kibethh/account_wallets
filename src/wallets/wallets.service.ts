import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Wallet } from './wallet.entity';
import { User } from 'src/users/user.entity';
import { Money } from 'src/money/money.entity';

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet) private walletRepo: Repository<Wallet>,
  ) {}
  async create(accountNumber: string, user: User) {
    const wallet = this.walletRepo.create({ accountNumber });
    wallet.user = user;
    return this.walletRepo.save(wallet);
  }
  async findOne(id: number) {
    let wallet = await this.walletRepo
      .createQueryBuilder('wallet')
      .where('wallet.id= :id', { id })
      .select('*')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(amount)', 'WalletBalance')
          .from(Money, 'money')
          .where('money.walletId= wallet.id FOR JSON AUTO');
      }, 'userMoney')
      .getRawOne();

    if (!wallet) {
      throw new NotFoundException('User not found');
    }
    if (wallet && wallet.userMoney) {
      wallet.userMoney = JSON.parse(wallet.userMoney);
    }

    return wallet;
  }
  async findByUser(userId: number) {
    let wallets = await this.walletRepo
      .createQueryBuilder('wallet')
      .where('wallet.id= :id', { id: userId })
      .select('*')
      .addSelect((subQuery) => {
        return subQuery
          .select('SUM(amount)', 'WalletBalance')
          .from(Money, 'money')
          .where('money.walletId= wallet.id FOR JSON AUTO');
      }, 'userMoney')
      .getRawMany();
    wallets.forEach((wallet) => {
      if (wallet && wallet.userMoney) {
        wallet.userMoney = JSON.parse(wallet.userMoney);
      }
    });
    return wallets;
  }
  find() {
    return this.walletRepo.find();
  }
}
