import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import WatchlistScreen from '../screens/WatchlistScreen'
import PortfolioScreen from '../screens/PortfolioScreen'
import { Entypo, FontAwesome, Foundation } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()
const BottomTabNavigaor = () => {
    return (
        <Tab.Navigator
            initialRouteName='首頁'
            screenOptions={{ 
                headerShown: false,
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    backgroundColor: '#181818'
                }
            }}
        >
            <Tab.Screen 
                name="首頁" 
                component={HomeScreen}
                options={{
                    tabBarIcon: ({focused, color}) => (<Entypo name='home' size={focused ? 30 : 25} color={color} />)
                }}
            />
            <Tab.Screen 
                name="資產" 
                component={PortfolioScreen}
                options={{
                    tabBarIcon: ({focused, color}) => (<Foundation name='graph-pie' size={focused ? 35 : 30} color={color} />)
                }}
            />
            <Tab.Screen 
                name="收藏" 
                component={WatchlistScreen}
                options={{
                    tabBarIcon: ({focused, color}) => (<FontAwesome name='star' size={focused ? 30 : 25} color={color} />)
                }}
            />
        </Tab.Navigator>
    )
}

export default BottomTabNavigaor