import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { HomeIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/outline'
import { BookmarkIcon } from 'react-native-heroicons/outline'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Dimensions } from 'react-native'
import { SafeAreaView } from 'react-native'


var {width , height} = Dimensions.get('window');

export default function Navigator() {
    const navigation = useNavigation();
  return (
    <View className="flex-row   bg-neutral-900   absolute z-10 bottom-0 justify-end" style={{width : width, height: height * 0.08}}>
          <SafeAreaView className="flex-1 flex-row justify-between mx-auto mx-7 ">
            <TouchableOpacity className=" flex-col  items-center " an onPress={() => {
             
              navigation.navigate("Home")}}>
          <HomeIcon size= "30" color={"#9A3B3B"} fill= "#9A3B3B"/>
          <Text className="text-white text-xs">Home</Text>
          </TouchableOpacity>
          <TouchableOpacity className=" flex-col  items-center"   onPress={() => {
             
             navigation.navigate("Favorites")}}>
          <HeartIcon size= "30" color={"#9A3B3B"}  fill= "#9A3B3B"/>
          <Text className="text-white text-xs">Favorites </Text>
          </TouchableOpacity>
          <TouchableOpacity className=" flex-col  items-center" an onPress={() => {
              
              
              navigation.navigate("Home")}}>
          <BookmarkIcon size= "30" color={"#9A3B3B"}  fill={"#9A3B3B"}/>
          <Text className="text-white text-xs">Watch </Text>
          </TouchableOpacity>
          <TouchableOpacity className=" flex-col  items-center"  onPress={() => {
              
              navigation.navigate("Search")}}>
          <MagnifyingGlassIcon size= "30"color={"#9A3B3B"} fill={"#9A3B3B"}  />
          <Text className="text-white  text-xs ">Search </Text>
          </TouchableOpacity>
          

          
          </SafeAreaView>
         
         </View>
  )
}