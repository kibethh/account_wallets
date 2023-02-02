import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoneyController } from './money.controller';
import { MoneyService } from './money.service';
import { Money } from './money.entity';
import { WalletsService } from 'src/wallets/wallets.service';
import { Wallet } from 'src/wallets/wallet.entity';

@Module({
  // Creating money repo
  imports: [TypeOrmModule.forFeature([Money, Wallet])],
  controllers: [MoneyController],
  providers: [MoneyService, WalletsService],
})
export class MoneyModule {}
