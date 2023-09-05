import React, { useContext, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type WatchlistContextValue = {
  watchlistCoinIds: string[];
  storeWatchlistCoinId: (coinId: string) => void;
  removeWatchlistCoinId: (coinId: string) => void;
};

const WatchlistContext = createContext<WatchlistContextValue>({} as WatchlistContextValue);

export const useWatchlist = () => useContext(WatchlistContext);

const WatchlistProvider = ({ children }: any) => {
  const [watchlistCoinIds, setWatchlistCoinIds] = useState<string[]>([]);

  const getWatchlistData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@watchlist_coins");
      setWatchlistCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getWatchlistData();
  }, []);

  const storeWatchlistCoinId = async (coinId: string) => {
    try {
      const newWatchlist = [...watchlistCoinIds, coinId];
      const jsonValue = JSON.stringify(newWatchlist);
      await AsyncStorage.setItem("@watchlist_coins", jsonValue);
      setWatchlistCoinIds(newWatchlist);
    } catch (e) {
      console.log(e);
    }
  };

  const removeWatchlistCoinId = async (coinId: string) => {
    const newWatchlist = watchlistCoinIds.filter((coinIdValue: string) => coinIdValue !== coinId);
    const jsonValue = JSON.stringify(newWatchlist);
    await AsyncStorage.setItem("@watchlist_coins", jsonValue);
    setWatchlistCoinIds(newWatchlist);
  };

  return <WatchlistContext.Provider value={{ watchlistCoinIds, storeWatchlistCoinId, removeWatchlistCoinId }}>{children}</WatchlistContext.Provider>;
};

export default WatchlistProvider;
