import React, { Suspense } from "react"
import { View, Text } from 'react-native'
import PortfolioAssetsList from "./components/PortfolioAssetsList"

const PortfolioScreen = () => {

    return (
      <View style={{flex: 1}}>
        <Suspense 
          fallback={
          <View style={{flex: 1, justifyContent:'center', alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 20}}>資料加載中，請稍後...</Text>
          </View>
        }
          >
          <PortfolioAssetsList />
        </Suspense>
      </View>
    )
}

export default PortfolioScreen