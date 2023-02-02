import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MoneyController } from './money.controller';
import { MoneyService } from './money.service';
import { Money } from './money.entity';

@Module({
  // Creating money repo
  imports: [TypeOrmModule.forFeature([Money])],
  controllers: [MoneyController],
  providers: [MoneyService],
})
export class MoneyModule {}
