import axios from 'axios'

export const getDeatilCoinData = async (coinId) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=true&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        return response.data
    } catch (e) {
        console.log(e);
    }
}

export const getCoinMarketChart = async (coinId, selectRange = "1") => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${selectRange}&interval=hourly`)
        return response.data
    } catch(e) {
        console.log(e);
    }
}

export const getCoinMarketData = async (page = 1) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=24h`)
        return response.data
    } catch(e) {
        console.log(e);
    }
}

export const getWatchlistedData = async (page = 1, coinIds) => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&per_page=50&page=${page}&sparkline=false&price_change_percentage=24h`)
        return response.data
    } catch(e) {
        console.log(e);
    }
}

export const getAllCoins = async () => {
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/list?include_platform=false`)
        return response.data
    } catch(e) {
        console.log(e);
    }
}