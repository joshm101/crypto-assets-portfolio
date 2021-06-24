import { FunctionComponent, ChangeEvent, useState, useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { Exchange, ExchangePair } from '../../types';
import { CryptoApi, Errors } from '../../api/crypto';

const useExchangePairs = (
  coinSymbol: string,
  exchangeId: string,
  cryptoApi: CryptoApi
) => {
  const [exchange, setExchange] = useState(exchangeId);
  const [pairs, setExchangePairs] = useState<ExchangePair[]>([]);
  const [retrievingPairs, setRetrievingPairs] = useState<boolean>(false);
  const [exchangePairRetrievalError, setExchangePairRetrievalError] =
    useState<Errors | null>(null);

  const processPairsData = (exchangePairs: ExchangePair[]) => {
    setExchangePairs(exchangePairs);
    setRetrievingPairs(false);
  };

  const onPairsRetrievalError = (error: Error) => {
    setRetrievingPairs(false);

    const errorType = error.message as Errors;
    setExchangePairRetrievalError(errorType);
  };

  useEffect(() => {
    setRetrievingPairs(true);
    cryptoApi
      .getExchangeTradingPairs(coinSymbol, exchange)
      .then(processPairsData)
      .catch(onPairsRetrievalError);
  }, [exchange, coinSymbol, cryptoApi]);

  return { setExchange, pairs, retrievingPairs, exchangePairRetrievalError };
};

const useExchangeListings = (coinSymbol: string, cryptoApi: CryptoApi) => {
  const [coin, setCoin] = useState(coinSymbol);
  const [exchangeListings, setExchangeListings] = useState<Exchange[]>([]);
  const [retrievingExchangeListings, setRetrievingExchangeListings] =
    useState<boolean>(false);
  const [exchangeListingsRetrievalError, setExchangeListingsRetrievalError] =
    useState<Errors | null>(null);

  const processExchangeListingsData = (exchangeListings: Exchange[]) => {
    setRetrievingExchangeListings(false);
    setExchangeListings(exchangeListings);
  };

  const onExchangeListingsRetrievalError = (error: Error) => {
    setRetrievingExchangeListings(false);

    const errorType = error.message as Errors;
    setExchangeListingsRetrievalError(errorType);
  };

  useEffect(() => {
    setRetrievingExchangeListings(true);

    cryptoApi
      .getExchangeListings(coin)
      .then(processExchangeListingsData)
      .catch(onExchangeListingsRetrievalError);
  }, [coin, cryptoApi]);

  return {
    setCoin,
    exchangeListings,
    retrievingExchangeListings,
    exchangeListingsRetrievalError,
  };
};

interface ExchangeSelectProps {
  onChange: (event: ChangeEvent<{ value: unknown }>) => {};
  value: string;
  exchanges: Exchange[];
}

const ExchangeSelect: FunctionComponent<ExchangeSelectProps> = ({
  onChange,
  value,
  exchanges,
}) => {
  return (
    <FormControl>
      <InputLabel>Exchange</InputLabel>
      <Select
        onChange={onChange}
        value={value}
        name="exchangeId"
        id="exchangeId"
        data-test-id="exchange-select"
      >
        {exchanges.map((exchange) => (
          <MenuItem key={exchange.id} value={exchange.id}>
            {exchange.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface TradingPairSelectProps {
  onChange: (event: ChangeEvent<{ value: unknown }>) => {};
  value: string;
  pairs: string[];
}

const TradingPairSelect: FunctionComponent<TradingPairSelectProps> = ({
  onChange,
  value,
  pairs,
}) => {
  return (
    <FormControl>
      <InputLabel>Trading pair</InputLabel>
      <Select onChange={onChange} value={value}>
        {pairs.map((pair) => (
          <MenuItem key={pair} value={pair}>
            {pair}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

interface PricePerCoinInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => {};
  value: number;
  pairTarget: string;
}

const PricePerCoinInput: FunctionComponent<PricePerCoinInputProps> = ({
  onChange,
  value,
  pairTarget,
}) => {
  return (
    <TextField
      label="Per coin"
      type="number"
      value={value}
      onChange={onChange}
      name="pricePerCoin"
      id="pricePerCoin"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">{pairTarget}</InputAdornment>
        ),
      }}
    />
  );
};

interface QuantityInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => {};
  value: number;
  coin: string;
}

const QuantityInput: FunctionComponent<QuantityInputProps> = ({
  onChange,
  value,
  coin,
}) => {
  return (
    <TextField
      label="Quantity"
      value={value}
      onChange={onChange}
      name="quantity"
      id="quantity"
      InputProps={{
        endAdornment: <InputAdornment position="end">{coin}</InputAdornment>,
      }}
    />
  );
};

interface FeeInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => {};
  value: number;
}

const FeeInput: FunctionComponent<FeeInputProps> = ({ onChange, value }) => {
  return (
    <TextField
      label="Fee"
      value={value}
      onChange={onChange}
      name="fee"
      id="fee"
      InputProps={{
        // todo: support multiple fee currencies
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
      }}
    />
  );
};

interface NotesInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => {};
  value: string;
}

const NotesInput: FunctionComponent<NotesInputProps> = ({
  onChange,
  value,
}) => {
  return (
    <TextField
      label="Notes"
      value={value}
      onChange={onChange}
      name="notes"
      id="notes"
      multiline
    />
  );
};

const TransactionForm = {
  ExchangeSelect,
  TradingPairSelect,
  PricePerCoinInput,
  QuantityInput,
  FeeInput,
  NotesInput,
};

export default TransactionForm;
export { useExchangePairs, useExchangeListings };
