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
      type: 'mssql' as const,
      host: 'localhost',
      port: 1433,
      username: 'hkk',
      password: 'sqlkibethh',
      database: 'touch_inspiration',
      // dropSchema: true,
      entities: [User, Wallet, Money],
      logger: 'advanced-console' as const,
      logging: true,
      synchronize: true,
      extra: {
        options: {
          encrypt: false,
        },
      },
    }),
    UsersModule,
    WalletsModule,
    MoneyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
