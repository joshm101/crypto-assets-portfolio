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
const getExchangeTradingPairs = (pairBase: string, exchangeId: string) => {
  const queryParams = `key=${API_KEY}&base=${pairBase}&exchange=${exchangeId}`;
  const url = `${API_BASE_URL}/markets?${queryParams}`;

  return fetch(url)
    .then((response) => response.json())
    .catch(() => {
      throw new Error(Errors.TradingPairsRetrieval);
    });
};

const crypto = {
  getExchangeTradingPairs,
};

export default crypto;
