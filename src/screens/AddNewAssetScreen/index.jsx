import React, { useState, useEffect } from "react"
import { View, Text, TextInput, Pressable  } from 'react-native'
import styles from "./styles"
import SearchableDropdown from 'react-native-searchable-dropdown'
import { useNavigation } from "@react-navigation/native"
import { useRecoilState } from "recoil";
import { allPortfolioBoughtAssetsInStorage } from "../../atoms/PortfolioAssets";
import { getAllCoins, getDeatilCoinData } from "../../services/requests"
import AsyncStorage from "@react-native-async-storage/async-storage"

const AddNewAssetScreen = () => {
    const navigation  = useNavigation()
    const [allCoins, setAllCoins] = useState([])
    const [selectCoinId, setSelectCoinId] = useState(null)
    const [selectCoin, setSelectCoin] = useState(null)
    const [boughtAssetQuantity, setBoughtAssetQuantity] = useState("")
    const [loading, setLoading] = useState(false)
    
    const [assetsInStorage, setAssetsInStorage] = useRecoilState(allPortfolioBoughtAssetsInStorage)

    const isQuantityEntered = () => boughtAssetQuantity === ""

    const fetchAllCoins = async () => {
      if(loading) {
        return 
      }
      setLoading(true)
      const allCoins = await getAllCoins()
      setAllCoins(allCoins)
      setLoading(false)
    }

    const fetchCoinInfo = async () => {
      if(loading) {
        return 
      }
      setLoading(true)
      const coinInfo = await getDeatilCoinData(selectCoinId)
      setSelectCoin(coinInfo)
      setLoading(false)
    }

    useEffect(() => {
      fetchAllCoins()
    }, [])

    useEffect(() => {
      if(selectCoinId) {
        fetchCoinInfo()
      }
    }, [selectCoinId])

    const onAddNewAsset = async () => {
      const newAsset = {
       id: selectCoin.id,
       unique_id: selectCoin.id + Math.random(0, 1e6),
       name: selectCoin.name,
       image: selectCoin.image.small,
       ticker: selectCoin.symbol.toUpperCase(),
       quantityBought: parseFloat(boughtAssetQuantity),
       priceBought: selectCoin.market_data.current_price.usd,
      }

      const newAssets = [...assetsInStorage, newAsset]
      const jsonValue = JSON.stringify(newAssets)
      await AsyncStorage.setItem('@portfolio_coins', jsonValue)
      setAssetsInStorage(newAssets)
      navigation.goBack()
   }

    return (
      <View style={{flex: 1}}>
        <SearchableDropdown 
          items={allCoins}
          onItemSelect={(item) => setSelectCoinId(item.id)}
          containerStyle={styles.dropdownContainer}
          itemStyle={styles.dropdownItem}
          itemTextStyle={styles.dropdownItemText}
          resetValue={false}
          placeholder={selectCoinId || "請選擇一款加密貨幣..."}
          placeholderTextColor="white"
          textInputProps={{
            underlineColorAndroid: 'transparent',
            style: styles.dropdownTextInput,
          }}
        />

        { selectCoin &&
          (<>
            <View style={styles.boughtQuantityContainer}>
              <View style={{flexDirection: 'row'}}>
                <TextInput 
                  style={{color: 'white', fontSize: 60}}
                  value={boughtAssetQuantity} 
                  placeholder="0" 
                  keyboardType="numeric"
                  onChangeText={setBoughtAssetQuantity}
                />
                <Text style={styles.ticker}>{selectCoin.symbol.toUpperCase()}</Text>
              </View>
              <Text style={styles.pricePerCoin}>${selectCoin.market_data.current_price.usd}/單位</Text>
            </View>
            <Pressable 
              style={{
                ...styles.buttonContainer, 
                backgroundColor: isQuantityEntered() ? '#303030' :'#4169E1',
              }}
              onPress={onAddNewAsset}
              disabled={isQuantityEntered()}
            >
              <Text 
                style={{
                  ...styles.buttonText, 
                  color: isQuantityEntered() ? 'grey' : 'white'
                }}
              >新增</Text>
            </Pressable>
          </>
        )}
      </View>
    )
}

export default AddNewAssetScreen