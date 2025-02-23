import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { WalletsService } from './wallets.service';
import { WalletPresenter } from './wallet.presenter';
import { CreateWalletAssetDto } from './dto/create-wallet-asset';
import { CreateWalletDto } from './dto/create-wallet';

@Controller('wallets')
export class WalletsController {
  constructor(private readonly walletsService: WalletsService) {}

  @Post()

  create(createWalletDto: CreateWalletDto) {
    return this.walletsService.create(createWalletDto);
  }

  @Get()
  findAll() {
    return this.walletsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wallet = await this.walletsService.findOne(id);

    if (!wallet) {
      throw new NotFoundException('Wallet not found');
    }

    return new WalletPresenter(wallet);
  }

  @Post(':id/assets')
  createWalletAsset(
    @Param('id') id: string,
    @Body() body: { assetId: string; shares: number },
  ) {
    var dto = new CreateWalletAssetDto(id, body.assetId, body.shares);
    return this.walletsService.createWalletAsset(dto);
  }
}
