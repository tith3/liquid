//type for storing the contents of an individual pane
export interface PaneData {
    index: number;
    dataPointName: DSDataPointNames;
    headerExpanded: boolean;
}

export interface PaneDimensions {
    rows: number;
    cols: number;
    maxRows: number;
    maxCols: number;
    vertical: boolean;
}

//types for dexscreener API
export type RawDSDataPoint = {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: {
      address: string;
      name: string;
      symbol: string;
    };
    quoteToken: {
      address: string;
      name: string;
      symbol: string;
    };
    priceNative: string;
    priceUsd: string;
    txns: {
      [key: string]: {
        buys: number;
        sells: number;
      };
    };
    volume: {
      [key: string]: number;
    };
    priceChange: {
      [key: string]: number;
    };
    liquidity: {
      usd: number;
      base: number;
      quote: number;
    };
    fdv: number;
    pairCreatedAt: number;
  };

export type TimeSeriesRawDSDataPoint = {
    time: number;
    data: RawDSDataPoint;
  };

//This is plural because the API is capable of returning multiple data points at once (for multiple tokens)
//Currently only implemented to return a single token's data

export type DSDataPoints = {
    schemaVersion: string;
    pairs: RawDSDataPoint[];
  };

export type TimeSeriesDSDataPoint = {
    type: DSDataPointNames;
    time: number;
    value: string | number;
};
  //enum for possible DS number datapoints
  export enum DSDataPointNames {
    PRICE_NATIVE = 'Price (Native)',
    PRICE_USD = 'Price (USD)',
    LIQUIDITY_USD = 'Liquidity (USD)',
    LIQUIDITY_BASE = 'Liquidity (Base)',
    LIQUIDITY_QUOTE = 'Liquidity (Quote)',
  }

  //enum for possible DS string labels
  export enum DSDataLabels{

  }