// import axios from "axios";
// import { Crypto } from "@/lib/types";

// export const fetchCryptos = async (start = 1, limit = 50): Promise<Crypto[]> => {
//   const res = await axios.get(`/api/cryptos`, { params: { start, limit } });
//   return res.data as Crypto[];
// };

export async function fetchCryptos(start: number, limit: number) {
  const apiKey = process.env.COINMARKETCAP_API_KEY; // امن و فقط سمت سرور

  const res = await fetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=${start}&limit=${limit}`,
    {
      headers: {
        "X-CMC_PRO_API_KEY": apiKey || "",
      },
      next: { revalidate: 60 }, // ISR برای کش
    }
  );

  if (!res.ok) throw new Error("Failed to fetch cryptos");
  const data = await res.json();
  return data.data; // فقط آرایه کریپتوها
}

