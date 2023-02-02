import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { AddMoneyDto } from './dtos/add-money.dto';
import { MoneyService } from './money.service';
import { WalletsService } from 'src/wallets/wallets.service';

@Controller('money')
export class MoneyController {
  constructor(
    private moneyService: MoneyService,
    private walletsService: WalletsService,
  ) {}

  @Post('/addMoney')
  async AddMoney(@Body() body: AddMoneyDto) {
    const { amount, walletId } = body;
    const wallet = await this.walletsService.findOne(walletId);
    if (!wallet) {
      throw new NotFoundException(`Wallet with id: '${walletId}' not found`);
    }
    const money = await this.moneyService.create(amount, wallet);
    return money;
  }

  @Get('/:id')
  async findMoney(@Param('id') id: number) {
    const money = await this.moneyService.findOne(id);
    if (!money) {
      throw new NotFoundException('Money not found');
    }
    return money;
  }
  @Get('/wallet/:walletId')
  async findWalletMoney(@Param('walletId') walletId: number) {
    const wallet = await this.walletsService.findOne(walletId);
    if (!wallet) {
      throw new NotFoundException(`Wallet with id: '${walletId}' not found`);
    }
    const walletMoney = await this.moneyService.findByWallet(wallet);

    return walletMoney;
  }
  @Get()
  findAllMoney() {
    return this.moneyService.find();
  }
}
