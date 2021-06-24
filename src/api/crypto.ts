import { ExchangePair, Exchange } from '../types';
import { SUPPORTED_EXCHANGES } from '../constants';

const API_BASE_URL = 'https://api.nomics.com/v1';
const API_KEY = process.env.NOMICS_API_KEY;

export enum Errors {
  TradingPairsRetrieval = 'TradingPairsRetrieval',
  ExchangeListingsRetrieval = 'ExchangeListingsRetrieval',
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

/**
 * Retrieves a coin's exchange listings by retrieving all exchange
 * pairs for a given coin & merging with array of supported exchanges
 * @param pairBase - Currency to get trading pairs for
 * @returns Array of supported exchanges that list the coin
 */
const getExchangeListings = (pairBase: string): Promise<Exchange[]> => {
  const queryParams = `key=${API_KEY}&base=${pairBase}`;
  const url = `${API_BASE_URL}/markets?${queryParams}`;

  return fetch(url)
    .then((response) => response.json())
    .then((data) => data as ExchangePair[])
    .then((exchangePairs) => {
      const exchangesListingCoinLookup: { [exchangeId: string]: boolean } =
        exchangePairs.reduce((accumulator, exchangePair) => {
          return {
            ...accumulator,
            [exchangePair.exchange]: true,
          };
        }, {});

      return exchangesListingCoinLookup;
    })
    .then((exchangesListingCoinLookup) => {
      return SUPPORTED_EXCHANGES.filter((supportedExchange) => {
        const isListedOnSupportedExchange =
          exchangesListingCoinLookup[supportedExchange.id];

        return isListedOnSupportedExchange;
      });
    })
    .catch(() => {
      throw new Error(Errors.ExchangeListingsRetrieval);
    });
};

export interface CryptoApi {
  getExchangeTradingPairs: (
    pairBase: string,
    exchangeId: string
  ) => Promise<ExchangePair[]>;
  getExchangeListings: (pairBase: string) => Promise<Exchange[]>;
}

const crypto: CryptoApi = {
  getExchangeTradingPairs,
  getExchangeListings,
};

export default crypto;
