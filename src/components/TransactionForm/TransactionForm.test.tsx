import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import TransactionForm from './TransactionForm';
import { SUPPORTED_EXCHANGES } from '../../constants';

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
