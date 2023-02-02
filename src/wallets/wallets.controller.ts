import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateWalletDto } from './dtos/create-wallet.dto';
import { UsersService } from 'src/users/users.service';
import { WalletsService } from './wallets.service';

@Controller('wallets')
export class WalletsController {
  constructor(
    private usersService: UsersService,
    private walletsService: WalletsService,
  ) {}

  @Post('/create')
  async createWallet(@Body() body: CreateWalletDto) {
    const { userId, accountNumber } = body;
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id: '${userId}' not found`);
    }
    const wallet = await this.walletsService.create(accountNumber, user);
    return wallet;
  }

  @Get('/:id')
  async findWallet(@Param('id') id: number) {
    const wallet = await this.walletsService.findOne(id);
    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }
    return wallet;
  }
  @Get('/user/:userId')
  async findUserWallets(@Param('userId') userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User with id: '${userId}' not found`);
    }
    const userWallets = await this.walletsService.findByUser(userId);

    return userWallets;
  }
  @Get()
  findAllWallets() {
    return this.walletsService.find();
  }
}
