"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchCryptos } from "@/services/cryptoServices";
import { db } from "@/lib/db";
import { Crypto } from "@/lib/types";

export const useCryptoData = () => {
  const [localData, setLocalData] = useState<Crypto[]>([]);
  const [loadedPages, setLoadedPages] = useState<number[]>([]);

  const loadPage = (page: number, pageSize: number) => {
   
    if (loadedPages.includes(page)) return;

    const start = page === 1 ? 1 : 10 + (page - 2) * pageSize + 1;
    const limit = page === 1 ? 10 : pageSize;

    fetchCryptos(start, limit).then(data => {
      db.cryptos.bulkPut(data);
      setLocalData(prev => {
        const existingIds = new Set(prev.map(c => c.id));
        const newData = data.filter(c => !existingIds.has(c.id));
        return [...prev, ...newData];
      });
      setLoadedPages(prev => [...prev, page]); 
    });
  };

  // initial load
  useEffect(() => {
    loadPage(1, 50);
  }, []);

  return { data: localData, loadPage };
};
