import { View, Text, SafeAreaView, Touchable, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { TextInput } from 'react-native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { XMarkIcon } from "react-native-heroicons/outline"
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Image } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { fetchSearchMovies } from '../components/moviedb';


var {width , height} = Dimensions.get('window');
export default function Search() {
  const [results , setResults] = useState([])
  const navigation = useNavigation();
  let movieName ="Lord of the Rings : Return of the King"
  const [query, setQuery] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  

  useEffect(() => {
    searchMovie(query);
  
  }, [isSubmitted])

  const searchMovie = async (query) => {
    const data = await fetchSearchMovies(query);
    console.log("************************************" + data.results);
    if(data && data.results) setResults(data.results);
    
  }

  return (
    
        <SafeAreaView className="bg-neutral-800 flex-1">
          <View className="mx-3 mb-4 flex-row justify-between items-center border border-neutral-500 rounded-full">

            <TextInput placeholder='Search Movie'
            placeholderTextColor='gray'
            style={{color: 'white'}}
            className="pb-1 pl-6 flex-1 text-base font-semibold tracking-wider"
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing= {() => setIsSubmitted(!isSubmitted)}
            />
            <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="rounded-full p-3 m-1 bg-neutral-500">
              <XMarkIcon size="25" strokeWidth={2} color="white" />

            </TouchableOpacity>
            </View>


            {/*Search Results*/}
            {results.length > 0  ? (
            <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal:15}}
            className="space-y-3 "
            >
              <Text className="text-white font-semibold ml-1 ">Results for :  {query} ({results.length}) </Text>
              <View className="flex-row flex-wrap justify-between">
                {
                  results.map((item , index) => {
                    const name = item.title ? item.title : item.name;
                    let poster = item.poster_path ? item.poster_path : item.profile_path;
                    
                    return(
                    <TouchableWithoutFeedback
                    onPress={() => navigation.push((item.media_type === "movie" ? "Movie" : "Person"), item)}
                    key={index}
                    >
                      <View className="space-y-2 mb-4">
                      <Image
                       source={{uri : "https://image.tmdb.org/t/p/w1280" + (poster)}}
                      style={{width: width * 0.44 , height: height * 0.34}}
                      className="rounded-xl   "
                      />
                      
                        <Text className="text-white font-semibold text-small mt-1">{name.length> 20 ? name.slice(0,20) + "..." :  name}</Text>
                       
                      
                      <Text className="text-neutral-400 font-semibold text-2sm"> {item.media_type.toUpperCase()}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                    )
                  }
                  
                  )
                }
              </View>

            </ScrollView>) : (

              isSubmitted ? (
              
             <View className="">
              <Text className="text-white font-semibold text-center text-2xl mt-20">No Results Found</Text>
             
              <Image
              source={require('../assets/notfound.png')}
              style={{ width: width * 1.2 , height: height * 0.9,  }}></Image>

              </View>
              ) : (
                <View className="">
                
               
                <Image
                source={require('../assets/notfound.png')}
                style={{ width: width * 1.2 , height: height * 0.9,  }}></Image>
  
                </View>

            ))
            }
      </SafeAreaView>
   
  )
}