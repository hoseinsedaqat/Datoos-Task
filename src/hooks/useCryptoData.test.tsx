/// <reference types="jest" />

import { renderHook, act } from "@testing-library/react";
import { useCryptoData } from "@/hooks/useCryptoData";
import { Crypto } from "@/lib/types";

// Mock داده‌ها
const mockDataPage1: Crypto[] = [
  { id: 1, name: "Bitcoin", symbol: "BTC", cmc_rank: 1, logo: "", quote: { USD: { price: 50000 } } },
  { id: 2, name: "Ethereum", symbol: "ETH", cmc_rank: 2, logo: "", quote: { USD: { price: 3000 } } },
];

const mockDataPage2: Crypto[] = [
  { id: 3, name: "Cardano", symbol: "ADA", cmc_rank: 3, logo: "", quote: { USD: { price: 2 } } },
];

// Mock db و service داخل factory function jest.mock
jest.mock("@/lib/db", () => {
  return {
    db: {
      cryptos: {
        bulkPut: jest.fn(),
      },
    },
  };
});

jest.mock("@/services/cryptoServices", () => ({
  fetchCryptos: jest.fn((start: number, limit: number) => {
    if (start === 1) return Promise.resolve(mockDataPage1);
    return Promise.resolve(mockDataPage2);
  }),
}));

// ----------------------
// تست‌ها
// ----------------------
describe("useCryptoData hook", () => {
  it("loads initial page", async () => {
    const { result } = renderHook(() => useCryptoData());

    await act(async () => { await new Promise(r => setTimeout(r, 0)); });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0].name).toBe("Bitcoin");
  });

  it("loads next page", async () => {
    const { result } = renderHook(() => useCryptoData());

    await act(async () => { await new Promise(r => setTimeout(r, 0)); });

    await act(async () => {
      result.current.loadPage(2, 50);
      await new Promise(r => setTimeout(r, 0));
    });

    expect(result.current.data).toHaveLength(3);
    expect(result.current.data[2].name).toBe("Cardano");
  });
});
