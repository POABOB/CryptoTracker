import React from "react"
import { View, Text, Image } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import styles from "./styles"
import { useNavigation } from '@react-navigation/native'
import { useWatchlist } from "../../../../Contexts/WatchlistContext";

const CoinDetailHeader = (props) => {
    const { 
        coinId,
        image,
        name,
        symbol,
        marketCapRank,
    } = props
    const navigation = useNavigation()

    const { watchlistCoinIds, setWatchlistCoin, removeWatchlistCoin } = useWatchlist()
    const checkIfCoinIsWatchlisted = () => watchlistCoinIds.some((coinIdValue) => coinIdValue === coinId)

    const handleWatchlistCoin = () => {
        if(checkIfCoinIsWatchlisted()) {
            return removeWatchlistCoin(coinId)
        } else {
            return setWatchlistCoin(coinId)
        }
    }

    return (
        <View style={styles.headerContainer}>
            <Ionicons 
                name='chevron-back-sharp' 
                size={30} 
                color='white'
                onPress={() => navigation.goBack()}
            />

            <View style={styles.tickerContainer}>
                <Image source={{ url: image }} style={{ width: 25, height: 25 }} />
                <Text style={styles.tickerTitle}>{symbol.toUpperCase()}</Text>
                <View style={styles.rankContainer}>
                    <Text style={styles.tickerRank}>#{marketCapRank}</Text>
                </View>
            </View>

            <FontAwesome 
                name={checkIfCoinIsWatchlisted() ? 'star' : 'star-o'} 
                size={30} 
                color={checkIfCoinIsWatchlisted() ? '#ffbf00' : 'white'} 
                onPress={handleWatchlistCoin}
            />
        </View>
    )
}

export default CoinDetailHeader