import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchFavoritedMovies } from '../components/moviedb'
import { styles } from '../theme'


var {width , height} = Dimensions.get('window');
export default function FavoritesScreen() {
    const navigation = useNavigation();

    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        console.log("oguz");
        getFavorites()
    }
    , [])

    const getFavorites = async () => {
        const data = await fetchFavoritedMovies();
        console.log(data);
        if(data) setFavorites(data);
    }



    return (
    
        <SafeAreaView className="bg-neutral-900 flex-1">
          <View className="mx-3 mb-4 flex-row items-center justify-center">
          <Text className = "text-white text-3xl font-bold ">rotten <Text style={styles.text} >cherry </Text></Text>
            </View>


            
            {favorites.length > 0  ? (
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
            className="space-y-3 ">
              <Text className="text-white font-semibold ml-1 text-xl">Favorites </Text>
              <View className="flex-row flex-wrap justify-between ">
                {
                  favorites.map((item , index) => {
                    const name = item.movieName && item.movieName 
                    let poster = item.moviePosterPath && item.moviePosterPath;
                    
                    return(
                    <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Movie', (item ))}
                    key={index}
                    >
                      <View className="space-y-2 mb-4">
                      <Image
                       source={{uri : "https://image.tmdb.org/t/p/w1280" + (poster)}}
                      style={{width: width * 0.44 , height: height * 0.34}}
                      className="rounded-xl   "
                      />
                      
                        <Text className="text-white font-semibold text-small mt-1">{name.length> 20 ? name.slice(0,20) + "..." :  name}</Text>
                       
                      
                      
                      </View>
                    </TouchableWithoutFeedback>
                    )
                  }
                  
                  )
                }
              </View>

            </ScrollView>) : (

             
                <View className="">
                
               
                <Image
                source={require('../assets/notfound.png')}
                style={{ width: width * 1.2 , height: height * 0.9,  }}></Image>
  
                </View>

            )
            }
      </SafeAreaView>
   
  )
}