import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WalletsController } from './wallets.controller';
import { UsersService } from 'src/users/users.service';
import { WalletsService } from './wallets.service';
import { Wallet } from './wallet.entity';
import { User } from 'src/users/user.entity';

@Module({
  // Creating Wallet repository
  imports: [TypeOrmModule.forFeature([Wallet, User])],
  controllers: [WalletsController],
  providers: [WalletsService, UsersService],
})
export class WalletsModule {}
