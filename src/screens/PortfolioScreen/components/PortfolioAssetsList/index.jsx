import React from "react"
import { View, Text, FlatList, Pressable } from 'react-native'
import styles from "./styles"
import PortfolioAssetItem from "../PortfolioAssetItem"
import { useNavigation } from "@react-navigation/native"
import { useRecoilValue, useRecoilState } from "recoil";
import { allPortfolioAssets, allPortfolioBoughtAssetsInStorage } from "../../../../atoms/PortfolioAssets";
import { SwipeListView } from 'react-native-swipe-list-view'
import { FontAwesome } from '@expo/vector-icons'
import AsyncStorage from "@react-native-async-storage/async-storage"

const PortfolioAssetsList = () => {
    const navigation  = useNavigation()
    const assets = useRecoilValue(allPortfolioAssets)
    const [storageAssets, setStorageAssets] = useRecoilState(allPortfolioBoughtAssetsInStorage)

    const getCurrentBalance = () => {
      const currentBalance = assets.reduce(
      (total, currentAsset) => 
        total + currentAsset.currentPrice * currentAsset.quantityBought
      , 0)
      return currentBalance.toFixed(2)
    }
    
    const getCurrentValueChange = () => {
      const currentBalance = getCurrentBalance()
      if(currentBalance !== '0.00') {
        const boughtBalance = assets.reduce(
          (total, currentAsset) => 
          total + currentAsset.currentPrice * (1 - currentAsset.priceChangePercentage / 100) * currentAsset.quantityBought
        , 0)
        return (currentBalance - boughtBalance).toFixed(2) || 0
      }
      return '0.00'
    }

    const getCurrentValuePercentageChange = () => {
      const currentBalance = getCurrentBalance()
      if(currentBalance !== '0.00') {
        const boughtBalance = assets.reduce(
          (total, currentAsset) => 
          total + currentAsset.currentPrice / (1 + currentAsset.priceChangePercentage / 100) * currentAsset.quantityBought
        , 0)
        return (((currentBalance - boughtBalance) / boughtBalance) * 100).toFixed(2) || 0
      }
      return '0.00'
    }
    
    const isChangePositive = () => getCurrentValuePercentageChange() >= 0 ? '#16c784' : '#ea3943'

    const onDeleteAsset = async (asset) => {
      const newAssets = storageAssets.filter((coin, index) => coin.unique_id !== asset.item.unique_id)
      const jsonValue = JSON.stringify(newAssets)
      await AsyncStorage.setItem('@portfolio_coins', jsonValue)
      setStorageAssets(newAssets)
    }

    const renderDeleteButton = (data) => {
      return (
        <Pressable 
          style={{
            flex: 1, 
            backgroundColor: '#EA3943', 
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingRight: 25,
            marginLeft: 20,
          }}
          onPress={() => onDeleteAsset(data)}
        >
          <FontAwesome name="trash-o" size={24} color="white" />
        </Pressable>
      )
    }

    return (
        <SwipeListView
        data={assets}
        renderItem={({item, index}) => {
          if(assets.length === 0) {
            return (
              <View style={{flex: 1}}>
                <Text style={{color: 'white'}}>尚無資產</Text>
              </View>)
          } else {
            return (<PortfolioAssetItem key={index} assetItem={item} />)
          }
        }}
        rightOpenValue={-75}
        disableRightSwipe
        closeOnRowPress
        keyExtractor={({id}, index) => `${id}${index}`}
        renderHiddenItem={(data) => renderDeleteButton(data)}
        ListHeaderComponent={
          <>
            <View style={styles.balanceContainer}>
              <View>
                <Text style={styles.currentBalance}>當前資產</Text>
                <Text style={styles.currentBalanceValue}>${getCurrentBalance()}</Text>
                <Text style={{...styles.valueChange, color: isChangePositive()}}>${getCurrentValueChange()} (24h)</Text>
              </View>
              <View style={{...styles.percentageChangeContainer, backgroundColor: isChangePositive()}}>
                <Text style={styles.percentageChange}>{getCurrentValuePercentageChange()}%</Text>
              </View>
            </View>
            <Text style={styles.assetsLabel}>資產配置</Text>
          </>
        }
        ListFooterComponent={
          <Pressable 
            style={styles.buttonContainer}
            onPress={() => navigation.navigate('AddNewAssetScreen')}
          >
            <Text style={styles.buttonText}>新增資產</Text>
          </Pressable>
        }
        />

      
    )
}

export default PortfolioAssetsList