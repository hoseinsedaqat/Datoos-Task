import { renderHook, act, waitFor } from "@testing-library/react";
import { useFavorites } from "@/hooks/useFavorites";

const FAVORITES_KEY = "crypto_favorites";

describe("useFavorites", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("loads favorites from localStorage on init", () => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(["btc", "eth"]));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual(["btc", "eth"]);
  });

  it("adds a favorite if not already in list", async () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite("btc");
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual(["btc"]);
    });

    expect(localStorage.getItem(FAVORITES_KEY)).toBe(JSON.stringify(["btc"]));
  });

  it("removes a favorite if already in list", async () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite("btc"); // add
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual(["btc"]);
    });

    act(() => {
      result.current.toggleFavorite("btc"); // remove
    });

    await waitFor(() => {
      expect(result.current.favorites).toEqual([]);
    });

    expect(localStorage.getItem(FAVORITES_KEY)).toBe(JSON.stringify([]));
  });

  it("checks if an item is favorite", async () => {
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite("eth");
    });

    await waitFor(() => {
      expect(result.current.isFavorite("eth")).toBe(true);
      expect(result.current.isFavorite("btc")).toBe(false);
    });
  });
});
