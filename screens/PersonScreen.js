import { View, Text , ScrollView} from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/solid';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { styles } from '../theme';
import { Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MovieList from '../components/movieList';
import { useRoute } from '@react-navigation/native';
import { useEffect } from 'react';
import { fetchPersonDetails, fetchPersonMovies } from '../components/moviedb';
import Navigator from '../components/navigator';

const topMargin = ios ? "" : "mt-3";
const ios = Platform.OS === 'ios';
var {width , height} = Dimensions.get('window');
export default function PersonScreen() {
    const {params: item} = useRoute();
    const navigation = useNavigation();
    const [color, toggleColor] = useState(false)
    const [personMovies, setPersonMovies] = useState([])
    const [personDetails, setPersonDetails] = useState([])

    
    useEffect(() => {
       
        fetchPersonDetailss(item.id)
        getPersonMovies(item.id)

    }, [item])

    const fetchPersonDetailss = async (personId) => {
        fetchPersonDetails(personId).then((data) => {
            console .log(data);
           if(data) setPersonDetails(data)
            
        }
        )
    }

    const getPersonMovies = async (personId) => {
        fetchPersonMovies(personId).then((data) => {
            console .log(data);
           if(data) setPersonMovies(data.cast)
            
        }
        )
    }



  return (
    <>
    <ScrollView className="flex-1 bg-neutral-900 " contentContainerStyle={{paddingBottom: 20 , paddingTop: 60}}>
         <SafeAreaView
        className={" z-20  w-full flex-row justify-between items-center  px-4 " + topMargin}>
            <TouchableOpacity style={styles.background} className="rounded-xl p-1 mx-4" onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <Text className = "text-white text-3xl font-bold ">rotten <Text style={styles.text} >cherry </Text></Text>
            <TouchableOpacity className="px-4" onPress={() => toggleColor(!color)}>
                <HeartIcon size= "35" color={color ? "red" : "white"}></HeartIcon>
            </TouchableOpacity>
        </SafeAreaView>
        {/*Person Details*/}

        <View className="flex-row  justify-center" 
        style={{
            shadowColor: "#gray",
            shadowRadius: 40,
            shadowOpacity: 1,
            shadowOffset: {
                width: 0,
                height: 5
            }
        }}>
            <View className=" overflow-hidden flex-row  mt-6 items-center  rounded-3xl shadow-xl " style={{backgroundColor :'#9A3B3B', width: width * 0.95  }}>
        <View className = "border-r-2 border-neutral-800 rounded-xl shadow-xl shadow-black">
        <Image 
        source={{uri : "https://image.tmdb.org/t/p/w1280" + personDetails.profile_path }}
        style={{height: height*0.24, width: width * 0.37 , shadowRadius : 20, }} className = "rounded-xl " ></Image>
        </View>
        <View className="  ml-4">
            <Text className="text-white text-3xl text-start font-bold"style={{width : width * 0.5}}>{personDetails.name}</Text>
            <Text className="text-neutral-300 text-base text-start " style={{width : width * 0.5}}>{personDetails.place_of_birth}</Text>
            </View>
        </View>
        </View>
        
            <View className="mx-3 p-4 pt-8 -z-10 flex-row justify-between items-center rounded-b-3xl  -mt-3" style={{backgroundColor :'#403535', width: width * 0.936 }}>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Gender</Text>
                <Text className="text-neutral-300 text-sm">{personDetails.gender == 1 ? "Female" : "Male"}</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Birthday</Text>
                <Text className="text-neutral-300 text-sm">{personDetails.birthday}</Text>
                </View>
                <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                <Text className="text-white font-semibold">Known For</Text>
                <Text className="text-neutral-300 text-sm">{personDetails.known_for_department}</Text>
                </View>
                <View className=" px-2 items-center">
                <Text className="text-white font-semibold">Popularity</Text>
                <Text className="text-neutral-300 text-sm">%{personDetails.popularity ? personDetails.popularity.toString().substring(0,2) : ""}</Text>
                </View>
            </View>
            <View className="my-6 mx-6 space-y-2">
            <Text className="text-white text-lg">Biography</Text>
                <Text className="text-neutral-400 tracking-wide">{personDetails.biography}</Text>
                </View>
            
            {/*Movies*/}
            
            <MovieList title="Movies Acted" hideSeeAll={true} data={personMovies} />
            


      
    </ScrollView>
    
    </>
  )
}