import React from "react";
import { Text, View, Image, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import styles from "./styles";
import { useNavigation } from '@react-navigation/native'

const CoinItem = ({ marketCoin }) => {
    // PROPS的變數名稱
    const {
        id,
        symbol, 
        name, 
        image, 
        current_price, 
        market_cap, 
        market_cap_rank, 
        price_change_percentage_24h,
    } = marketCoin

    const navigation = useNavigation()

    // 轉換單位
    const normalizeMarketCap = (marketCap) => {
        if(marketCap > 1e12) {
            return `${(marketCap / 1e12).toFixed(2)} T`
        } else if(marketCap > 1e9) {
            return `${(marketCap / 1e9).toFixed(2)} B`
        } else if(marketCap > 1e6) {
            return `${(marketCap / 1e6).toFixed(2)} M`
        } else if(marketCap > 1e3) {
            return `${(marketCap / 1e3).toFixed(2)} K`
        } else {
            return `${(marketCap)}`
        }
    }

    const percentageColor = price_change_percentage_24h < 0 ? '#ea3943' : '#16c784' || 'white'

    return (
        <Pressable 
            style={styles.coinContainer}
            onPress={() => navigation.navigate('CoinDetail', { coinId: id })}
        >
            <Image 
                source={{ url: image }} 
                style={{ 
                    height: 30,  
                    width: 30, 
                    marginRight: 10, 
                    alignSelf: 'center' 
                }} 
            />

            <View style={{}}>
                <Text style={styles.title} >{name}</Text>
                <View style={{ flexDirection: 'row' }}>
                
                    <View style={styles.rankContainer}>
                        <Text style={styles.rank} >{market_cap_rank}</Text>
                    </View>
                    <Text style={styles.text} >{symbol.toUpperCase()}</Text>
                    <AntDesign 
                        name={price_change_percentage_24h < 0 ? 'caretdown' : 'caretup' }
                        size={12} 
                        color={percentageColor}
                        style={{ alignSelf: 'center', marginRight: 5 }} 
                    />
                    <Text style={{ color: percentageColor }} >{price_change_percentage_24h?.toFixed(2)}%</Text>
                </View>
            </View>

            <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
                <Text style={styles.title} >{current_price}</Text>
                <Text style={{ color: 'white' }} >MCap {normalizeMarketCap(market_cap)}</Text>
            </View>
        </Pressable>
    );
}

export default CoinItem