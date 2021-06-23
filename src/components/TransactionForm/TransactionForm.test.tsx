import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';

import TransactionForm, { useExchangePairs } from './TransactionForm';
import { Errors, CryptoApi } from '../../api/crypto';
import { SUPPORTED_EXCHANGES } from '../../constants';
import { ExchangePair } from '../../types';

describe('Transaction Form -- Exchange Select', () => {
  it('renders', () => {
    const onChange = jest.fn();
    const selectedExchange = SUPPORTED_EXCHANGES[0];
    render(
      <TransactionForm.ExchangeSelect
        exchanges={SUPPORTED_EXCHANGES}
        onChange={onChange}
        value={selectedExchange.id}
      />
    );

    expect(screen.getByText('Exchange')).toBeInTheDocument();
    expect(screen.getByText(selectedExchange.name)).toBeInTheDocument();
  });

  it('allows selection of an exchange', () => {
    const onChange = jest.fn();
    const selectedExchange = SUPPORTED_EXCHANGES[0].id;
    render(
      <TransactionForm.ExchangeSelect
        exchanges={SUPPORTED_EXCHANGES}
        onChange={onChange}
        value={selectedExchange}
      />
    );

    const expectedExchangeOptionIndex = 1;
    const expectedExchangeOption =
      SUPPORTED_EXCHANGES[expectedExchangeOptionIndex];

    // material-ui's default select component responds to
    // mousedown event, not click event
    fireEvent.mouseDown(screen.getByRole('button'));

    expect(screen.getByText(expectedExchangeOption.name)).toBeInTheDocument();
    fireEvent.click(screen.getByText(expectedExchangeOption.name));

    expect(onChange.mock.calls.length).toBe(1);
    const changeEventObject = onChange.mock.calls[0][0];
    expect(changeEventObject.target.value).toEqual(expectedExchangeOption.id);
  });
});

describe('Transaction Form -- Trading Pair Select', () => {
  const pairs = ['BTC/USD', 'BTC/ETH', 'BTC/USDT'];

  it('renders', () => {
    const onChange = jest.fn();
    const value = 'BTC/USD';

    render(
      <TransactionForm.TradingPairSelect
        onChange={onChange}
        value={value}
        pairs={pairs}
      />
    );

    expect(screen.getByText('Trading pair')).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it('allows selection of a trading pair', () => {
    const onChange = jest.fn();
    const value = 'BTC/USD';

    render(
      <TransactionForm.TradingPairSelect
        onChange={onChange}
        value={value}
        pairs={pairs}
      />
    );

    const expectedPairOption = pairs[1];

    // material-ui's default select component responds to
    // mousedown event, not click event
    fireEvent.mouseDown(screen.getByRole('button'));

    expect(screen.getByText(expectedPairOption)).toBeInTheDocument();
    fireEvent.click(screen.getByText(expectedPairOption));

    expect(onChange.mock.calls.length).toBe(1);
    const changeEventObject = onChange.mock.calls[0][0];
    expect(changeEventObject.target.value).toBe(expectedPairOption);
  });
});

describe('Transaction Form -- Price Per Coin Input', () => {
  // simple render test only -- anything more creeps into testing
  // 3rd-party functionality
  it('renders', () => {
    const onChange = jest.fn();
    const value = 32768.64;
    const expectedLabel = 'Per coin';
    const expectedPairTarget = 'USD';

    render(
      <TransactionForm.PricePerCoinInput
        onChange={onChange}
        value={value}
        pairTarget={expectedPairTarget}
      />
    );

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    expect(screen.getByText(expectedPairTarget)).toBeInTheDocument();
  });
});

describe('Transaction Form -- Quantity Input', () => {
  // simple render test only -- anything more creeps into testing
  // 3rd-party functionality
  it('renders', () => {
    const onChange = jest.fn();
    const value = 5;
    const expectedLabel = 'Quantity';
    const expectedCoinSymbol = 'BTC';

    render(
      <TransactionForm.QuantityInput
        onChange={onChange}
        value={value}
        coin={expectedCoinSymbol}
      />
    );

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
    expect(screen.getByText(expectedCoinSymbol)).toBeInTheDocument();
  });
});

describe('Transaction Form -- Fee Input', () => {
  // simple render test only -- anything more creeps into testing
  // 3rd-party functionality
  it('renders', () => {
    const onChange = jest.fn();
    const value = 5;
    const expectedLabel = 'Fee';

    render(<TransactionForm.FeeInput onChange={onChange} value={value} />);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  });
});

describe('Transaction Form -- Notes Input', () => {
  // simple render test only -- anything more creeps into testing
  // 3rd-party functionality
  it('renders', () => {
    const onChange = jest.fn();
    const value = 'Bought on Coinbase';
    const expectedLabel = 'Notes';

    render(<TransactionForm.NotesInput onChange={onChange} value={value} />);

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    expect(screen.getByText(expectedLabel)).toBeInTheDocument();
  });
});

describe('useExchangePairs', () => {
  const coin = 'BTC';
  const exchangeId = 'binance';

  const mockResponseData1: ExchangePair[] = [
    { exchange: 'binance', market: 'BTCUSDT', base: coin, quote: 'USD' },
    { exchange: 'binance', market: 'BTCETH', base: coin, quote: 'ETH' },
  ];

  const mockResponseData2: ExchangePair[] = [
    { exchange: 'gdax', market: 'BTCUSD', base: coin, quote: 'USD' },
  ];
  it('retrieves trading pairs for a given coin & exchange', async () => {
    const mockGetExchangeTradingPairs = (
      pairBase: string,
      exchangeId: string
    ) => {
      return new Promise<ExchangePair[]>((resolve) => {
        setTimeout(() => {
          resolve(mockResponseData1);
        }, 0);
      });
    };
    const mockCryptoApi: CryptoApi = {
      getExchangeTradingPairs: mockGetExchangeTradingPairs,
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useExchangePairs(coin, exchangeId, mockCryptoApi)
    );

    expect(result.current.pairs.length).toBe(0);
    expect(result.current.retrievingPairs).toBe(true);
    expect(result.current.exchangePairRetrievalError).toBe(null);

    await waitForNextUpdate();
    expect(result.current.pairs).toEqual(mockResponseData1);
    expect(result.current.retrievingPairs).toBe(false);
    expect(result.current.exchangePairRetrievalError).toBe(null);
  });

  it('sets expected error on pairs retrieval error', async () => {
    const mockGetExchangeTradingPairs = (
      pairBase: string,
      exchangeId: string
    ) => {
      return new Promise<ExchangePair[]>(() => {
        throw new Error(Errors.TradingPairsRetrieval);
      });
    };

    const mockCryptoApi: CryptoApi = {
      getExchangeTradingPairs: mockGetExchangeTradingPairs,
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useExchangePairs(coin, exchangeId, mockCryptoApi)
    );

    expect(result.current.pairs.length).toBe(0);
    expect(result.current.retrievingPairs).toBe(true);
    expect(result.current.exchangePairRetrievalError).toBe(null);

    await waitForNextUpdate();
    expect(result.current.pairs).toEqual([]);
    expect(result.current.retrievingPairs).toBe(false);
    expect(result.current.exchangePairRetrievalError).toEqual(
      Errors.TradingPairsRetrieval
    );
  });

  it('retrieves updated set of exchange pairs when exchange is updated', async () => {
    let dataIndex = 0;
    const responses = [mockResponseData1, mockResponseData2];

    const mockGetExchangeTradingPairs = (
      pairBase: string,
      exchangeId: string
    ) => {
      return new Promise<ExchangePair[]>((resolve) => {
        setTimeout(() => {
          resolve(responses[dataIndex]);
          ++dataIndex;
        }, 0);
      });
    };

    const mockCryptoApi: CryptoApi = {
      getExchangeTradingPairs: mockGetExchangeTradingPairs,
    };

    const { result, waitForNextUpdate } = renderHook(() =>
      useExchangePairs(coin, exchangeId, mockCryptoApi)
    );

    await waitForNextUpdate();
    expect(result.current.pairs).toEqual(mockResponseData1);
    expect(result.current.retrievingPairs).toBe(false);
    expect(result.current.exchangePairRetrievalError).toBe(null);

    const updatedExchange = 'gdax';
    act(() => result.current.setExchange(updatedExchange));

    expect(result.current.retrievingPairs).toBe(true);

    await waitForNextUpdate();
    expect(result.current.pairs).toEqual(mockResponseData2);
    expect(result.current.retrievingPairs).toBe(false);
    expect(result.current.exchangePairRetrievalError).toBe(null);
  });
});
