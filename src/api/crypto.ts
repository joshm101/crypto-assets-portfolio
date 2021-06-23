import { ExchangePair } from '../types';

const API_BASE_URL = 'https://api.nomics.com/v1';
const API_KEY = process.env.NOMICS_API_KEY;

export enum Errors {
  TradingPairsRetrieval = 'TradingPairsRetrieval',
}

/**
 * Retrieves trading pairs for the given currency on the provided exchange
 * @param pairBase - Currency to get trading pairs for
 * @param exchangeId - Exchange to get trading pairs for the given pairBase
 * @returns Trading pairs JSON
 */
const getExchangeTradingPairs = (
  pairBase: string,
  exchangeId: string
): Promise<ExchangePair[]> => {
  const queryParams = `key=${API_KEY}&base=${pairBase}&exchange=${exchangeId}`;
  const url = `${API_BASE_URL}/markets?${queryParams}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data as ExchangePair[])
    .catch(() => {
      throw new Error(Errors.TradingPairsRetrieval);
    });
};

export interface CryptoApi {
  getExchangeTradingPairs: (
    pairBase: string,
    exchangeId: string
  ) => Promise<ExchangePair[]>;
}

const crypto: CryptoApi = {
  getExchangeTradingPairs,
};

export default crypto;
