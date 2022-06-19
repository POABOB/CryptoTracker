import React from "react"
import { View, Text, Image } from 'react-native'
import styles from "./styles"

const PortfolioAssetItem = ({assetItem}) => {
    const {
      currentPrice,
      image,
      name,
      priceBought,
      priceChangePercentage,
      quantityBought,
      ticker,
    } = assetItem
    
    const isChangePositive = () => priceChangePercentage >= 0 ? '#16c784' : '#ea3943'
    return (
      <View style={styles.coinContainer}>
        <Image source={{uri: image}} style={{height: 30, width: 30, marginRight: 10, alignSelf: 'center'}} />
        <View>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.ticker}>{ticker}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.title}>{currentPrice.toFixed(2)}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: isChangePositive(), fontWeight: '500'}}>{priceChangePercentage?.toFixed(2)}%</Text>
          </View>
        </View>
        <View style={styles.quantityContainer}>
          <Text style={styles.title}>${(parseFloat(currentPrice * quantityBought).toFixed(2))}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.ticker}>{quantityBought}</Text>
          </View>
        </View>
      </View>
    )
}

export default PortfolioAssetItem