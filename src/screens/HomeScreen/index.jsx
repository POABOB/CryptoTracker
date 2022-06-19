import React, { useEffect, useState } from "react"
import { FlatList, RefreshControl, View, Text } from 'react-native';
import CoinItem from '../../components/CoinItem/index'
import { getCoinMarketData } from '../../services/requests'

const HomeScreen = () => {
    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchCoins = async (page = 1) => {
        if(loading) {
            return
        }
        setLoading(true)
        const data = await getCoinMarketData(page)
        setCoins((oldData) => ([...oldData, ...data]))
        setLoading(false)
    }

    const refreshCoins = async () => {
        if(loading) {
            return
        }
        setLoading(true)
        const data = await getCoinMarketData()
        setCoins(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchCoins();
        // console.log(1);
    }, [])

    return (
        <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text style={{color: 'white', fontSize: 25, letterSpacing: 0.5, paddingHorizontal: 20}}>加密貨幣</Text>
                <Text style={{color: 'lightgrey', fontSize: 12, paddingHorizontal: 10}}>Powered by CoinGecko</Text>
            </View>
            
            <FlatList 
                data={coins}
                renderItem={({item}) => <CoinItem key={item.id} marketCoin={item}/>}
                onEndReached={() => fetchCoins((coins.length / 50) + 1)}
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        tintColor="white"
                        onRefresh={refreshCoins}
                    />
                }
            />
        </View>
    )
}

export default HomeScreen