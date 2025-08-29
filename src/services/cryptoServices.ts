import axios from "axios";
import { Crypto } from "@/lib/types";

export const fetchCryptos = async (start = 1, limit = 50): Promise<Crypto[]> => {
  const res = await axios.get(`/api/cryptos`, { params: { start, limit } });
  return res.data as Crypto[];
};
