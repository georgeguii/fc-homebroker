export class CreateWalletAssetDto {
  walletId: string;

  assetId: string;

  shares: number;

  constructor(walletId: string, assetId: string, shares: number) {
    this.walletId = walletId;
    this.assetId = assetId;
    this.shares = shares;
  }

}