import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Wallet } from './wallet.entity';
import { User } from 'src/users/user.entity';

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
  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.walletRepo.findOneBy({ id });
  }
  findByUser(user: User) {
    return this.walletRepo.find({ where: { user } });
  }
  find() {
    return this.walletRepo.find();
  }
}
