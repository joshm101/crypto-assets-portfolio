import { Exchange } from './types';

const SUPPORTED_EXCHANGES: Exchange[] = [
  {
    id: 'binance',
    name: 'Binance',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/binance.svg',
    websiteUrl: 'https://www.binance.com/',
  },
  {
    id: 'bybit',
    name: 'Bybit',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/bybit.jpg',
    websiteUrl: 'https://www.bybit.com/',
  },
  {
    id: 'ftx',
    name: 'FTX',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/ftx.png',
    websiteUrl: 'https://ftx.com/',
  },
  {
    id: 'phemex',
    name: 'Phemex',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/phemex.jpg',
    websiteUrl: 'https://phemex.com/',
  },
  {
    id: 'gdax',
    name: 'Coinbase',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/gdax.png',
    websiteUrl: 'https://pro.coinbase.com/',
  },
  {
    id: 'bitmex',
    name: 'Bitmex',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/bitmex.png',
    websiteUrl: 'https://www.bitmex.com/',
  },
  {
    id: 'lbank',
    name: 'Lbank',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/lbank.jpg',
    websiteUrl: 'https://www.lbank.info/',
  },
  {
    id: 'deversifi',
    name: 'DeversiFi',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/deversifi.jpg',
    websiteUrl: 'https://www.deversifi.com/',
  },
  {
    id: 'kraken',
    name: 'Kraken',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/kraken.svg',
    websiteUrl: 'https://www.kraken.com/',
  },
  {
    id: 'uniswapv3',
    name: 'Uniswap V3',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/uniswapv3.png',
    websiteUrl: 'https://uniswap.exchange',
  },
  {
    id: 'xt',
    name: 'XT.COM',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/xt.jpg',
    websiteUrl: 'https://www.xt.com/',
  },
  {
    id: 'bitflyer',
    name: 'bitFlyer',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/bitflyer.png',
    websiteUrl: 'https://bitflyer.com/en-jp/',
  },
  {
    id: 'bitstamp',
    name: 'Bitstamp',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/bitstamp.jpg',
    websiteUrl: 'https://www.bitstamp.net/',
  },
  {
    id: 'pancakeswapv2',
    name: 'PancakeSwap V2',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/pancakeswapv2.jpg',
    websiteUrl: 'https://pancakeswap.finance/',
  },
  {
    id: 'gateio',
    name: 'Gate.io',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/gateio.png',
    websiteUrl: 'https://www.gate.io/',
  },
  {
    id: 'liquid',
    name: 'Liquid',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/liquid.jpg',
    websiteUrl: 'https://liquid.com',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/gemini.svg',
    websiteUrl: 'https://gemini.com/',
  },
  {
    id: 'equos',
    name: 'EQONEX',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/equos.png',
    websiteUrl: 'https://eqonex.com/',
  },
  {
    id: 'curve',
    name: 'Curve Finance',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/curve.jpg',
    websiteUrl: 'https://www.curve.fi/',
  },
  {
    id: 'probit',
    name: 'ProBit',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/probit.jpg',
    websiteUrl: 'https://www.probit.com',
  },
  {
    id: 'poloniex',
    name: 'Poloniex',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/poloniex.svg',
    websiteUrl: 'https://poloniex.com/',
  },
  {
    id: 'ftx_us',
    name: 'FTX.us',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/ftx_us.png',
    websiteUrl: 'https://ftx.us/',
  },
  {
    id: 'delta_futures',
    name: 'Delta Exchange',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/delta_futures.png',
    websiteUrl: 'https://delta.exchange/',
  },
  {
    id: 'currency',
    name: 'Currency.com',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/currency.svg',
    websiteUrl: 'https://currency.com/',
  },
  {
    id: 'coinfield',
    name: 'CoinField',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/coinfield.jpg',
    websiteUrl: 'https://www.coinfield.com/',
  },
  {
    id: 'nominex',
    name: 'Nominex',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/nominex.png',
    websiteUrl: 'https://nominex.io/',
  },
  {
    id: 'polyx',
    name: 'Polyx',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/polyx.svg',
    websiteUrl: 'https://polyx.net',
  },
  {
    id: 'mercado_bitcoin',
    name: 'Mercado Bitcoin',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/mercado_bitcoin.png',
    websiteUrl: 'https://www.mercadobitcoin.com.br/',
  },
  {
    id: 'bitso',
    name: 'Bitso',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/bitso.jpg',
    websiteUrl: 'https://bitso.com/',
  },
  {
    id: 'crosstower',
    name: 'CrossTower',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/crosstower.jpg',
    websiteUrl: 'https://crosstower.com/',
  },
  {
    id: 'binance_dex',
    name: 'Binance DEX',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/binance_dex.png',
    websiteUrl: 'https://www.binance.org/en/trade',
  },
  {
    id: 'redot',
    name: 'Redot',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/redot.png',
    websiteUrl: 'https://redot.com/',
  },
  {
    id: 'antares',
    name: 'Antares',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/antares.jpg',
    websiteUrl: 'https://antares.exchange/',
  },
  {
    id: 'sigen',
    name: 'SIGEN.pro',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/sigen.jpg',
    websiteUrl: 'https://sigen.pro',
  },
  {
    id: 'therocktrading',
    name: 'The Rock Trading',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/therocktrading.png',
    websiteUrl: 'https://therocktrading.com/',
  },
  {
    id: '1inchv2',
    name: '1inch V2',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/1inchv2.jpg',
    websiteUrl: 'https://1inch.io',
  },
  {
    id: 'incognito',
    name: 'Incognito pDEX',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/incognito.png',
    websiteUrl: 'https://incognito.org/',
  },
  {
    id: 'demex',
    name: 'Demex',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/demex.png',
    websiteUrl: 'https://dem.exchange/',
  },
  {
    id: 'coinflex',
    name: 'CoinFLEX',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/coinflex.jpg',
    websiteUrl: 'https://coinflex.com/',
  },
  {
    id: 'belfrics',
    name: 'Belfrics',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/belfrics.png',
    websiteUrl: 'https://belfrics.com',
  },
  {
    id: 'qtrade',
    name: 'qTrade',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/qtrade.png',
    websiteUrl: 'https://qtrade.io',
  },
  {
    id: 'zebitex',
    name: 'ZEBITEX',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/zebitex.svg',
    websiteUrl: 'https://zebitex.com',
  },
  {
    id: 'farhad',
    name: 'FarhadMarket',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/farhad.png',
    websiteUrl: 'https://app.farhadmarket.com/',
  },
  {
    id: 'zubr',
    name: 'ZUBR',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/zubr.svg',
    websiteUrl: 'https://zubr.io/',
  },
  {
    id: 'namebase',
    name: 'Namebase',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/namebase.jpg',
    websiteUrl: 'https://www.namebase.io',
  },
  {
    id: 'hitbtc',
    name: 'HitBTC',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/hitbtc.svg',
    websiteUrl: 'https://hitbtc.com/',
  },
  {
    id: 'bitfinex',
    name: 'Bitfinex',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/bitfinex.png',
    websiteUrl: 'https://www.bitfinex.com/',
  },
  {
    id: 'vindax',
    name: 'Vindax',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/vindax.png',
    websiteUrl: 'https://vindax.com/',
  },
  {
    id: 'wbbexchange',
    name: 'WBBExchange',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/wbbexchange.jpg',
    websiteUrl: 'https://wbbexchange.pro',
  },
  {
    id: 'binance_us',
    name: 'Binance US',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/binance_us.png',
    websiteUrl: 'https://www.binance.us/en',
  },
  {
    id: 'bittrex',
    name: 'Bittrex',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/bittrex.png',
    websiteUrl: 'https://bittrex.com/',
  },
  {
    id: 'b2bx',
    name: 'B2BX',
    logoUrl:
      'https://s3.us-east-2.amazonaws.com/nomics-api/static/images/exchanges/b2bx.jpeg',
    websiteUrl: 'https://www.b2bx.exchange/',
  },
];

export { SUPPORTED_EXCHANGES };
