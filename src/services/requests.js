import axios from "axios";
import { all, bitcoin, ethereum, market, tether, usdcoin, stakedether, dogecoin, cardano, solana } from "../../data";
import { bitcoin1, bitcoin1chart, bitcoinWatch } from "../../data1";

export const getDetailedCoinData = async (coinId) => {
  try {
    switch (coinId) {
      case "bitcoin":
        return bitcoin;
      case "ethereum":
        return ethereum;
      case "ethereum":
        return ethereum;
      case "tether":
        return tether;
      case "usd-coin":
        return usdcoin;
      case "staked-ether":
        return stakedether;
      case "dogecoin":
        return dogecoin;
      case "cardano":
        return cardano;
      case "solana":
        return bitcoin;
      case "tron":
        return ethereum;
      case "the-open-network":
        return tether;
      case "polkadot":
        return usdcoin;
      case "matic-network":
        return dogecoin;
      case "litecoin":
        return stakedether;
      case "shiba-inu":
        return cardano;
      case "wrapped-bitcoin":
        return bitcoin;
      case "dai":
        return solana;

      default:
        return "not found";
    }
    // const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    // return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getCoinMarketChart = async (coinId, selectedRange) => {
  try {
    // const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectedRange}&interval=hourly`);
    if ("bitcoin") {
      switch (selectedRange) {
        case "1":
          return bitcoin1;
        default:
          return bitcoin1;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getMarketData = async (pageNumber = 1) => {
  try {
    // const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`);
    // return response.data;
    return market;
  } catch (e) {
    console.log(e);
  }
};

export const getWatchlistedCoins = async (pageNumber = 1, coinIds) => {
  try {
    // const response = await axios.get(
    //   `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${pageNumber}&sparkline=false&price_change_percentage=24h`
    // );
    // return response.data;
    return bitcoinWatch;
  } catch (e) {
    console.log(e);
  }
};

export const getAllCoins = async () => {
  try {
    // const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`);A
    // return response.data;
    return all;
  } catch (e) {
    console.error(e);
  }
};

export const getCandleChartData = async (coinId, days = 1) => {
  try {
    // const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`);
    // return response.data;
    return bitcoin1chart;
  } catch (e) {
    console.log(e);
  }
};
