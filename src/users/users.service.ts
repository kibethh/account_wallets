import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Wallet } from 'src/wallets/wallet.entity';
import { Money } from 'src/money/money.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  create(email: string, password: string) {
    const user = this.repo.create({ email, password });
    return this.repo.save(user);
  }
  async findOne(id: number) {
    let user = await this.repo
      .createQueryBuilder('user')
      .where('user.id= :id', { id })
      .select('*')
      .addSelect((subQuery) => {
        return subQuery
          .select('*')
          .addSelect((subQuery) => {
            return subQuery
              .select('SUM(amount)', 'WalletBalance')
              .from(Money, 'money')
              .where('money.walletId= wallet.id FOR JSON AUTO');
          }, 'userMoney')
          .from(Wallet, 'wallet')
          .where('wallet.userId= user.id FOR JSON AUTO');
      }, 'wallets')
      .getRawOne();
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user && user.wallets) {
      user.wallets = JSON.parse(user.wallets);
    }
   
    return user;
  }
  findByEmail(email: string) {
    return this.repo.find({ where: { email } });
  }
  async find() {
    let users = await this.repo
      .createQueryBuilder('user')
      .select('id as id,email as email')
      .addSelect((subQuery) => {
        return subQuery
          .select('*')
          .addSelect((subQuery) => {
            return subQuery
              .select('*')
              .from(Money, 'money')
              .where('money.walletId= wallet.id FOR JSON AUTO');
          }, 'userMoney')
          .from(Wallet, 'wallet')
          .where('wallet.userId= user.id FOR JSON AUTO');
      }, 'userWallets')
      .getRawMany();

    users.forEach((user) => {
      if (user.userWallets) {
        user.userWallets = JSON.parse(user.userWallets);
      }
    });

    return users;
  }
}
