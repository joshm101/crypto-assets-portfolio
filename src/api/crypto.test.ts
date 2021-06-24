import crypto, { Errors } from './crypto';
import { Exchange } from '../types';

import fetchMock from 'jest-fetch-mock';

describe('Crypto API -- get exchange trading pairs', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('retrieves coin trading pairs on a given exchange', async () => {
    const mockData = [
      { exchange: 'binance', market: 'BTCUSDT', base: 'BTC', quote: 'USD' },
      { exchange: 'binance', market: 'BTCETH', base: 'BTC', quote: 'ETH' },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const { getExchangeTradingPairs } = crypto;

    const pairBase = 'BTC';
    const exchangeId = 'binance';

    const responseData = await getExchangeTradingPairs(pairBase, exchangeId);
    expect(responseData).toEqual(mockData);
  });

  it('throws correct error on data retrieval error', async () => {
    fetchMock.mockImplementationOnce(() => {
      return new Promise(() => {
        throw new Error('retrieval error');
      });
    });

    const { getExchangeTradingPairs } = crypto;

    const pairBase = 'BTC';
    const exchangeId = 'binance';

    const expectedError = new Error(Errors.TradingPairsRetrieval);
    await expect(
      getExchangeTradingPairs(pairBase, exchangeId)
    ).rejects.toThrowError(expectedError);
  });
});

describe('Crypto API -- get exchange listings', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const mockData = [
    { exchange: 'binance', market: 'BTCUSDT', base: 'BTC', quote: 'USDT' },
    { exchange: 'gdax', market: 'BTCUSD', base: 'BTC', quote: 'USD' },
    { exchange: 'okex', market: 'BTCUSDT', base: 'BTC', quote: 'USDT' },
  ];

  it('retrieves supported exchange listings for a coin', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const { getExchangeListings } = crypto;

    const pairBase = 'BTC';
    const exchangeListingsData = await getExchangeListings(pairBase);

    const expectedResult: Exchange[] = [
      {
        id: 'binance',
        name: 'Binance',
        logoUrl:
          'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/binance.svg',
        websiteUrl: 'https://www.binance.com/',
      },
      {
        id: 'gdax',
        name: 'Coinbase',
        logoUrl:
          'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/gdax.png',
        websiteUrl: 'https://pro.coinbase.com/',
      },
    ];

    expect(exchangeListingsData).toEqual(expectedResult);
  });

  it('throws correct error on exchange listings retrieval error', async () => {
    const pairBase = 'BTC';
    const { getExchangeListings } = crypto;

    fetchMock.mockImplementationOnce(() => {
      return new Promise(() => {
        throw new Error(Errors.ExchangeListingsRetrieval);
      });
    });

    const expectedError = new Error(Errors.ExchangeListingsRetrieval);

    await expect(getExchangeListings(pairBase)).rejects.toThrowError(
      expectedError
    );
  });
});
