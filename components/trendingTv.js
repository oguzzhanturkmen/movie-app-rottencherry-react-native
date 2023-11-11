import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { ImageBackground } from 'react-native';
import { BlurView } from 'expo-blur';


var {width , height} = Dimensions.get('window');

const heightX = Platform.isPad ? height * 0.6 : height * 0.4;

export default function TrendingTv({data}) {
  const x = ""
const navigation = useNavigation();
const [posterPath , setPosterPath] = useState("");
    const handleClick = (item) => {
        navigation.navigate('Movie' , item)
        console.log('clicked')
    }

  return (
    <View className = "mb-8 ">
      <Text className= "text-white text-xl mx-4 mb-5">Trending Tv Shows</Text>
     
     
      

      <Carousel
      data = {data}
      renderItem={({item}) => <MovieCard item={item} handleClick={handleClick} />}
      firstItem={1}
      inactiveSlideOpacity={0.3}
      sliderWidth={width}
      itemWidth={width * 0.6}
      enableMomentum={true}
      lockScrollWhileSnapping={true}
      autoplay={true}
      autoplayInterval={3000}


      
      loop={true}
      slideStyle={{display: 'flex', alignItems: 'center'}}
        />
    </View>
  )
}

const MovieCard = ({item, handleClick}) => {
    return (
       <TouchableWithoutFeedback onPress={() => handleClick(item)}>
        <Image
        source={{uri : "https://image.tmdb.org/t/p/w1280" + item.poster_path}}
        style={{width: width * 0.6, height: heightX}}
        className = "rounded-3xl"
        />

       </TouchableWithoutFeedback>

    )
}