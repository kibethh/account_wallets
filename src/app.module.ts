import { APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { WalletsModule } from './wallets/wallets.module';
import { MoneyModule } from './money/money.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// Entities
import { User } from './users/user.entity';
import { Wallet } from './wallets/wallet.entity';
import { Money } from './money/money.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Wallet, Money],
      synchronize: true,
    }),
    UsersModule,
    WalletsModule,
    MoneyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
