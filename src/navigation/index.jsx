import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import HomeScreen from '../screens/HomeScreen'
import CoinDetailScreen from '../screens/CoinDetailScreen'
import BottomTabNavigaor from './BottomTabNavigator'
import AddNewAssetScreen from '../screens/AddNewAssetScreen'
const Stack = createNativeStackNavigator()

const Navigation = () => {
	return (
		<Stack.Navigator initialRouteName='Root'>
			<Stack.Screen 
				name="Root" 
				component={BottomTabNavigaor} 
				options={{ headerShown: false }} 
			/>
			<Stack.Screen 
				name="CoinDetail" 
				component={CoinDetailScreen} 
				options={{ headerShown: false }} 
			/>
			<Stack.Screen 
				name="AddNewAssetScreen" 
				component={AddNewAssetScreen} 
				options={{ 
					headerStyle: {
						backgroundColor: '#121212',
					},
					headerTintColor: 'white',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					title: '新增資產',
				}} 
			/>
		</Stack.Navigator>
	)
}

export default Navigation