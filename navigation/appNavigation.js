import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeScreen from '../screens/HomeScreen';
import { View, Text } from 'react-native'
import React from 'react'
import MovieScreen from '../screens/MovieScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import Navigator from '../components/navigator';

export default function AppNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen} />
      <Stack.Screen name="Movie" options={{headerShown: false}} component={MovieScreen} />
      <Stack.Screen name="Person" options={{headerShown: false}} component={PersonScreen} />
      <Stack.Screen name="Search" options={{headerShown: false}} component={SearchScreen} />
      <Stack.Screen name="Favorites" options={{headerShown: false}} component={FavoritesScreen} />
      
    </Stack.Navigator>
    <Navigator></Navigator>
  </NavigationContainer>
  )
}
