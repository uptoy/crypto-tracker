import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import CoinItem from "../../components/CoinItem";
import { getMarketData } from "../../services/requests";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Coin {
  ath: number;
  ath_change_percentage: number;
  ath_date: string; // Could also use Date if transforming string to Date object
  atl: number;
  atl_change_percentage: number;
  atl_date: string; // Could also use Date
  circulating_supply: number;
  current_price: number;
  fully_diluted_valuation: number;
  high_24h: number;
  id: string;
  image: string;
  last_updated: string; // Could also use Date
  low_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_rank: number;
  max_supply: number;
  name: string;
  price_change_24h: number;
  price_change_percentage_24h: number;
  price_change_percentage_24h_in_currency: number;
  roi: null | { [key: string]: number | string }; // Assuming ROI can be an object with unknown keys and values that are numbers or strings
  symbol: string;
  total_supply: number;
  total_volume: number;
}

const initialData = {
  ath: 69045,
  ath_change_percentage: -62.70656,
  ath_date: "2021-11-10T14:24:11.849Z",
  atl: 67.81,
  atl_change_percentage: 37873.08408,
  atl_date: "2013-07-06T00:00:00.000Z",
  circulating_supply: 19477225,
  current_price: 25716,
  fully_diluted_valuation: 540065979820,
  high_24h: 25921,
  id: "bitcoin",
  image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
  last_updated: "2023-09-05T18:17:58.684Z",
  low_24h: 25603,
  market_cap: 500904123991,
  market_cap_change_24h: -3427218080.315857,
  market_cap_change_percentage_24h: -0.67956,
  market_cap_rank: 1,
  max_supply: 21000000,
  name: "Bitcoin",
  price_change_24h: -181.63156452132534,
  price_change_percentage_24h: -0.70133,
  price_change_percentage_24h_in_currency: -0.7013339734344974,
  roi: null,
  symbol: "btc",
  total_supply: 21000000,
  total_volume: 8845386064,
};

const HomeScreen = () => {
  const [coins, setCoins] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins = async (pageNumber: any) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData: any = await getMarketData(pageNumber);
    setCoins((existingCoins: any) => [...existingCoins, ...coinsData]);
    setLoading(false);
  };

  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCoins("1");
  }, []);

  return (
    <View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text style={{ fontFamily: "DroidSans", color: "white", fontSize: 25, letterSpacing: 1, paddingHorizontal: 20, paddingBottom: 5 }}>Cryptoassets</Text>
        <Text style={{ color: "lightgrey", fontSize: 12, paddingHorizontal: 10 }}>Powered by CoinGecko</Text>
      </View>
      <FlatList
        data={coins}
        renderItem={({ item }) => <CoinItem marketCoin={item} />}
        onEndReached={() => fetchCoins(String(coins.length / 50 + 1))}
        refreshControl={<RefreshControl refreshing={loading} tintColor="white" onRefresh={refetchCoins} />}
      />
    </View>
  );
};

export default HomeScreen;
