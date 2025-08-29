"use client";
import { useState } from "react";
import { useCryptoData } from "@/hooks/useCryptoData";
import { useFavorites } from "@/hooks/useFavorites";
import { Crypto } from "@/lib/types";
import CryptoCardSkeleton from "@/components/CryptoCardSkeleton";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function Home() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<"cmc_rank" | "price">("cmc_rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [loadingMore, setLoadingMore] = useState(false);
  const pageSizeMore = 50;

  const { data, loadPage } = useCryptoData();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setLoadingMore(true);
    await loadPage(nextPage, pageSizeMore);
    setLoadingMore(false);
  };

  // فیلتر بر اساس جستجو
  const filteredData = data.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(search.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // مرتب‌سازی داده‌ها
  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = sortField === "cmc_rank" ? a.cmc_rank : a.quote.USD.price;
    const bVal = sortField === "cmc_rank" ? b.cmc_rank : b.quote.USD.price;
    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  return (
    <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center sm:text-left text-gray-800">
        Crypto Dashboard
      </h1>

      {/* Search + Sort */}
      <div className="mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4 items-start sm:items-center">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or symbol..."
          className="w-full sm:w-1/3 p-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        <div className="flex gap-2 items-center">
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as "cmc_rank" | "price")}
            className="p-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="cmc_rank">Rank</option>
            <option value="price">Price</option>
          </select>

          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="px-3 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
          >
            {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>
      </div>

      {/* Skeleton Loader */}
      {data.length === 0 && <CryptoCardSkeleton count={10} />}

      {/* کارت‌ها */}
      <div className="flex flex-col gap-4 sm:gap-6">
        {sortedData.map((crypto: Crypto) => (
          <div
            key={crypto.id}
            className="bg-white rounded-2xl shadow-md p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 hover:shadow-lg transition"
          >
            {/* Logo + Name */}
            <div className="flex items-center gap-3 sm:gap-4">
              {crypto.logo && (
                <img
                  src={crypto.logo}
                  alt={crypto.name}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full"
                  loading="lazy"
                />
              )}
              <div>
                <p className="font-bold text-gray-800 text-base sm:text-lg">{crypto.name}</p>
                <p className="text-gray-500 uppercase text-xs sm:text-sm">{crypto.symbol}</p>
              </div>
            </div>

            {/* Rank + Price */}
            <div className="flex gap-6 mt-3 sm:mt-0 w-full sm:w-auto justify-between sm:justify-start">
              <div className="flex-1 text-center sm:text-left">
                <p className="text-gray-400 text-xs sm:text-sm">Rank</p>
                <p className="font-semibold text-gray-800">{crypto.cmc_rank}</p>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <p className="text-gray-400 text-xs sm:text-sm">Price</p>
                <p className="font-semibold text-gray-800">${crypto.quote.USD.price.toFixed(2)}</p>
              </div>
            </div>

            {/* Favorite */}
            <button
              onClick={() => toggleFavorite(String(crypto.id))}
              className="mt-3 sm:mt-0 ml-auto text-yellow-500 hover:text-yellow-400 transition"
            >
              {isFavorite(String(crypto.id)) ? <AiFillStar size={24} /> : <AiOutlineStar size={24} />}
            </button>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-6 sm:mt-8 flex flex-col items-center gap-4">
        <button
          onClick={handleLoadMore}
          className="px-8 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition disabled:opacity-50"
          disabled={loadingMore}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
        {loadingMore && <CryptoCardSkeleton count={5} />}
      </div>
    </main>
  );
}
