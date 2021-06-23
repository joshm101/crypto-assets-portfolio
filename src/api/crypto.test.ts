import crypto, { Errors } from './crypto';

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
