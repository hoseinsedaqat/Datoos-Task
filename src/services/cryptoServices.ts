// import axios from "axios";
// import { Crypto } from "@/lib/types";

// export const fetchCryptos = async (start = 1, limit = 50): Promise<Crypto[]> => {
//   const res = await axios.get(`/api/cryptos`, { params: { start, limit } });
//   return res.data as Crypto[];
// };

// services/cryptoServices.ts
import axios from "axios";
import { Crypto } from "@/lib/types";

const API_KEY = process.env.NEXT_PUBLIC_CMC_API_KEY; // از Netlify یا .env میاد
const BASE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

export async function fetchCryptos(start: number, limit: number): Promise<Crypto[]> {
  const response = await axios.get(BASE_URL, {
    params: {
      start,
      limit,
      convert: "USD",
    },
    headers: {
      "X-CMC_PRO_API_KEY": API_KEY,
    },
  });

  const data = response.data.data;

  // normalize → مطمئن شیم id همیشه number هست
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return data.map((item: any) => ({
    id: Number(item.id),  // 👈 اینجا تبدیل می‌کنیم
    name: item.name,
    symbol: item.symbol,
    cmc_rank: item.cmc_rank,
    logo: item.logo ?? "", // اگه نداشت خالی
    quote: {
      USD: {
        price: item.quote.USD.price,
      },
    },
  }));
}


