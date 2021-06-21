export interface Exchange {
  id: string;
  name: string;
  logoUrl: string;
  websiteUrl: string;
}

enum TRANSACTION_TYPE {
  BUY,
  SELL,
}

export interface Transaction {
  type: TRANSACTION_TYPE;
  coin: string;
  pairTarget: string;
  pricePerCoin: number;
  quantity: number;
  fee: number;
  date: Date;
  notes: string;
}
