import { View, Text, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import {styles} from '../theme';
var {width , height} = Dimensions.get('window');
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
const heightX = Platform.isPad ? height * 0.35 : height * 0.4;
let movieName = "Ant Man and the Wasp ant man and the was pasdpk"
export default function TvListLand({title, data, hideSeeAll}) {
    const navigation = useNavigation();

  return (
    <View className="mb-8 space-y-4">
      <View className= "mx-4 flex-row justify-between items-center" >
        <Text className="text-white text-xl">{title}</Text>
        {!hideSeeAll &&
        <TouchableOpacity>
            <Text className="text-lg" style={styles.text}>See All</Text>
        </TouchableOpacity>
}
      </View>
    {/*Movie Row*/}
      <ScrollView  horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: 15}}>
        {
        data.map((item, index) => {
            return(
                <TouchableWithoutFeedback 
                key={index}
                onPress={() => navigation.push('Movie', item)}
            >
                <View className="mr-4 space-y-1">
                    <Image
                       source={{uri : "https://image.tmdb.org/t/p/w1280" + item.backdrop_path}}
                        style={{width: width * 0.59, height: height * 0.18}}
                        className = "rounded-3xl"
                    />
                    <Text className="text-neutral-300 ml-1 abs">{item.name.length > 30 ? item.name.slice(0,30) + "..." : item.name}</Text>
                    
                </View>
            </TouchableWithoutFeedback>
            )
        })
        }

      </ScrollView>
    </View>
  )
}