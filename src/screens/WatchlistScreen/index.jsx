import React, { useState, useEffect } from "react"
import { FlatList, RefreshControl, View, Text } from 'react-native'
import { useWatchlist } from '../../Contexts/WatchlistContext'
import CoinItem from '../../components/CoinItem';
import { getWatchlistedData } from "../../services/requests";

const WatchlistScreen = () => {
    const {watchlistCoinIds}= useWatchlist()

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)

    const TransformCoinIds = () => watchlistCoinIds.join('%2C')

    const isWatchlistNull = () => watchlistCoinIds.length === 0

    const fetchWatchlistedCoins = async () => {
        if(loading || isWatchlistNull()) {
            return
        }
        setLoading(true)
        const watchlistCoinData = await getWatchlistedData(1, TransformCoinIds())
        setCoins(watchlistCoinData)
        setLoading(false)
    }

    useEffect(() => {fetchWatchlistedCoins()}, [])
    useEffect(() => {fetchWatchlistedCoins()}, [watchlistCoinIds])

    return (
        <View style={{flex: 1}}>
        { isWatchlistNull() &&
            (<View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 20}}>目前沒有收藏的加密貨幣...</Text>
            </View>)
        }
        { !isWatchlistNull() &&
            (<>
                <FlatList 
                    data={coins}
                    renderItem={({item}) => <CoinItem marketCoin={item}/>}
                    // onEndReached={() => fetchCoins((coins.length / 50) + 1)}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            tintColor="white"
                            onRefresh={fetchWatchlistedCoins}
                        />
                    }
                />
            </>)
        }
        </View>
    )
}

export default WatchlistScreen