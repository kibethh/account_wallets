import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Wallet } from 'src/wallets/wallet.entity';
import { Money } from './money.entity';

@Injectable()
export class MoneyService {
  constructor(@InjectRepository(Money) private moneyRepo: Repository<Money>) {}
  create(amount: number, wallet: Wallet) {
    const money = this.moneyRepo.create({ amount });
    money.wallet = wallet;
    return this.moneyRepo.save(money);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.moneyRepo.findOneBy({ id });
  }
  findByWallet(wallet: Wallet) {
    return this.moneyRepo.find({ where: { wallet } });
  }
  find() {
    return this.moneyRepo.find();
  }
}
