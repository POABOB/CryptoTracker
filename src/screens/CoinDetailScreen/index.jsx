import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Dimensions, ActivityIndicator } from 'react-native'
import CoinDetailHeader from "./components/CoinDetailHeader"
import styles from "./styles"
import { 
    ChartDot, 
    ChartPath, 
    ChartPathProvider, 
    ChartYLabel } from '@rainbow-me/animated-charts'
import { useRoute } from '@react-navigation/native'
import { getDeatilCoinData, getCoinMarketChart } from '../../services/requests'
import FilterComponent from "./components/FilterComponent"

const filterDaysArray = [
    { filterDay: '1', filterText: '24h' },
    { filterDay: '7', filterText: '7d' },
    { filterDay: '30', filterText: '30d' },
    { filterDay: '365', filterText: '1y' },
    { filterDay: 'max', filterText: 'All' },
]

const CoinDetailScreen = () => {
    const [coinValue, setCoinValue] = useState('1')
    const [usdValue, setUsdValue] = useState('2')
    const [coin, setCoin] = useState(null)
    const [coinMarketData, setCoinMarketData] = useState(null)
    const [loading, setLoading] = useState(false)

    const [selectRange, setSelectRange] = useState("1")

    const route = useRoute()
    const { params: { coinId }} = route
    const fetchCoinData = async () => {
        setLoading(true)
        const data = await getDeatilCoinData(coinId)
        setCoin(data)
        setUsdValue(data.market_data.current_price.usd.toString())
        setLoading(false)
    }

    const fetchCoinMarketData = async (selectRange) => {
        const data = await getCoinMarketChart(coinId, selectRange)
        setCoinMarketData(data)
    }

    useEffect(() => {
        fetchCoinData()
        fetchCoinMarketData(1)
    }, [])
    if(loading || !coin || !coinMarketData) {
        return <ActivityIndicator size='large' />
    }
    const { 
        id,
        image: { small },
        name,
        symbol,
        market_data: { 
            market_cap_rank, 
            current_price,
            price_change_percentage_24h,
        },
    } = coin
    const { prices } = coinMarketData

    // FUNC
    const changeUsdValue = (value) => {
        setUsdValue(value)
        const floatValue = parseFloat(value.replace(',', '.')) || 0
        setCoinValue((floatValue / current_price.usd).toString())
    }

    const changeCoinValue = (value) => {
        setCoinValue(value)
        const floatValue = parseFloat(value.replace(',', '.')) || 0
        setUsdValue((floatValue * current_price.usd).toString())
    }

    // FORMAT
    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white'
    const chartColor = current_price.usd > prices[0][1] ? '#16c784' : '#ea3943'
    const screenWidth = Dimensions.get('window').width
    const formatCurrency = (value) => {
        'worklet';
        if(value === '') {
            if(current_price.usd < 1) {
                return `$${current_price.usd}`
            }
            return `$${current_price.usd.toFixed(2)}`
        }
        if(current_price.usd < 1) {
            return `$${parseFloat(value)}`
        }
        return `$${parseFloat(value).toFixed(2)}`
    }

    const onSelectRangeChange = async (value) => {
        setSelectRange(value)
        fetchCoinMarketData(value)
    }

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <ChartPathProvider 
                data={{ 
                    points: prices.map((price) => ({ x: price[0], y: price[1] })), 
                    // smoothingStrategy: 'bezier' 
                }}
            >
                <CoinDetailHeader 
                    coinId={id}
                    image={small} 
                    name={name}
                    symbol={symbol}
                    marketCapRank={market_cap_rank}
                />

                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.name}>{name}</Text>
                        <ChartYLabel
                            format={formatCurrency}
                            style={styles.currentPrice}                            
                        />
                        {/* <Text style={styles.currentPrice}>${current_price.usd}</Text> */}
                    </View>
                    <View style={{ backgroundColor: percentageColor, padding: 5, borderRadius: 5 }}>
                        <Text style={styles.priceChange}>{price_change_percentage_24h?.toFixed(2)}%</Text>
                    </View>
                </View>

                <View style={styles.filterContainer}>
                    {
                        filterDaysArray.map((day) => 
                            (<FilterComponent 
                                filterDay={day.filterDay} 
                                filterText={day.filterText}
                                selectRange={selectRange} 
                                setSelectRange={onSelectRangeChange} 
                                key={day.filterText}
                            />)
                        )
                    }
                </View>

                <View>
                    <ChartPath 
                        height={screenWidth / 2} 
                        stroke={chartColor} 
                        strokeWidth={2}
                        width={screenWidth} 
                    />
                    <ChartDot style={{ backgroundColor: chartColor }} />
                </View>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row' , flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>{symbol.toUpperCase()}</Text>
                        <TextInput 
                            style={styles.input} 
                            value={coinValue} 
                            keyboardType='numeric'
                            onChangeText={changeCoinValue}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ color: 'white', alignSelf: 'center' }}>USD</Text>
                        <TextInput 
                            style={styles.input} 
                            value={usdValue} 
                            keyboardType='numeric'
                            onChangeText={changeUsdValue}
                        />
                    </View>
                </View>
            </ChartPathProvider>
        </View>
    )
}

export default CoinDetailScreen