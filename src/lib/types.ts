export interface CryptoQuoteUSD {
  price: number;
}

export interface CryptoQuote {
  USD: CryptoQuoteUSD;
}

export interface Crypto {
  id: number;
  name: string;
  symbol: string;
  cmc_rank: number;
  logo?: string;
  quote: CryptoQuote;
}
