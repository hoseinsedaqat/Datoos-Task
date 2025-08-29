import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const start = searchParams.get("start") || "1";
  const limit = searchParams.get("limit") || "10";

  try {
    const res = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: { "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY! },
        params: { start, limit, convert: "USD" },
      }
    );

    interface CryptoItem {
      id: number;
      name: string;
      symbol: string;
      cmc_rank: number;
      quote: {
        USD: {
          price: number;
        };
      };
    }

    const data = res.data.data.map((item: CryptoItem) => ({
      id: item.id,
      name: item.name,
      symbol: item.symbol,
      cmc_rank: item.cmc_rank,
      logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`,
      quote: { USD: { price: item.quote.USD.price } },
    }));

    return NextResponse.json(data);
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      // @ts-expect-error: Dynamic import used for error typing in catch block
      console.error((err as AxiosError).response?.data || (err as unknown as Error).message);
    } else {
      console.error((err as Error).message);
    }
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
