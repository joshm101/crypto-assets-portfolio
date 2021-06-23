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
  exchangeId: string;
  coin: string;
  pairTarget: string;
  pricePerCoin: number;
  quantity: number;
  fee: number;
  date: Date;
  notes: string;
}

export interface ExchangePair {
  exchange: string;
  market: string;
  base: string;
  quote: string;
}
