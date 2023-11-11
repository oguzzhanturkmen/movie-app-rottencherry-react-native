import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { styles } from '../theme'
import { Dimensions } from 'react-native'
import {HeartIcon} from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import Cast from '../components/cast'
import MovieList from '../components/movieList'
import { fetchMovieCredits, fetchMovieDetails } from '../components/moviedb'
import { Platform } from 'react-native'
import { BookmarkIcon } from 'react-native-heroicons/outline'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { HomeIcon } from 'react-native-heroicons/outline'
import { fetchFavoritedMovies } from '../components/moviedb'
import { fetchSimilarMovies } from '../components/moviedb'
import Navigator from '../components/navigator'
import { deleteFavoritedMovie } from '../components/moviedb'
import { postFavoritedMovie } from '../components/moviedb'





var {width , height} = Dimensions.get('window');
const ios = Platform.OS === 'ios'
const heightX = Platform.isPad ? height * 0.35 : height * 0.22;
const topMargin = ios ? "" : "mt-3";
let movieName ="Lord of the Rings : Return of the King"
export default function MovieScreen() {
    const {params: item} = useRoute();
   const navigation = useNavigation();
   const [color, toggleColor] = useState(false)
   const [cast, setCast] = useState([])
    const [smilarMovies, setSmilarMovies] = useState([])
    const [movie, setMovie] = useState({})
    const [favorites, setFavorites] = useState([])
    const [favoriteId, setFavoriteId] = useState("")


    useEffect(() => {
        
        getFavorites()
        getMovieDetails(item.movieId ? item.movieId : item.id)
        getCast(item.movieId ? item.movieId : item.id)
        getSmilarMovies(item.movieId ? item.movieId : item.id)
        
        
        
        
       


    }, [item])

    getMovieDetails = async (id) => {
        const data = await fetchMovieDetails(id);
        if(data ) setMovie(data)
        checkFavorites(id)
        
    }

    getCast = async (id) => {
        const data = await fetchMovieCredits(id);
        
        if(data ) setCast(data.cast)
        
        
    }
    getSmilarMovies = async (id) => {
        const data = await fetchSimilarMovies(id);
        if(data ) setSmilarMovies(data.results)
    }

    getFavorites = async () => {
        const data = await fetchFavoritedMovies();
        
        if(data) setFavorites(data);
        
    }

    checkFavorites = (id) => {
      
        let result = false;
        favorites.map((item , index) => {
          console.log(item.movieId + " " + id);
            if(item.movieId === id){
             toggleColor(true);
             setFavoriteId(item.id)
            }
        })
        
    }

    






  return (
    <>
    <ScrollView
    contentContainerStyle={{paddingBottom : 20}}
    className="flex-1 bg-neutral-900"
     >
      <View
      className="w-full ">
        <SafeAreaView
        className={"absolute z-20  w-full flex-row justify-between items-center  px-4 " + topMargin}>
            <TouchableOpacity style={styles.background} className="rounded-xl p-1 mx-4" onPress={() => navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="px-4" onPress={() => {
              if(color){
                deleteFavoritedMovie(favoriteId)
                toggleColor(!color)
              }
              else{
                const data = {
                  userId : 1,
                  movieId: movie.id,
                  movieName: movie.title,
                  posterPath: movie.poster_path
                }
                postFavoritedMovie(data)
                toggleColor(!color)
              }
            }}>
                <HeartIcon size= "35" color={color ? "red" : "white"}></HeartIcon>
            </TouchableOpacity>
        </SafeAreaView>
        <View >
            <Image
            source={{uri : "https://image.tmdb.org/t/p/w1280" + movie.poster_path}}
            style={{width, height: height * 0.55}}
            
            />
            <LinearGradient
            colors={["transparent" , "rgba(23,23,23,0.8)" , "rgba(23,23,23,1)"]}
            style={{width, height: height * 0.5 }}
            start={{x: 0.5 , y:0}}
            end={{x: 0.5 , y:1}}
            className="absolute bottom-0 "/>
            </View>
            {/*Movie Details*/}
        <View style={{marginTop : -(height * 0.1)}}>
            <Text className="text-white text-center text-3xl font-bold tracking-wider">{movie.title}</Text>
            <Text className="text-neutral-400 font-semibold text-base text-center " >{movie?.status} • {movie?.release_date?.split('-')[0]} • {movie?.runtime} min </Text>
        </View>
        {/*Movie Genres*/}
        <View className=" flex-row justify-center mx-4 space-x-3 mt-2">

          {
              movie?.genres?.map((item , index) => {
                  return(
                    <View style={{backgroundColor :  '#9A3B3B', borderRadius : 30 , padding : 4 }}>
                    <Text className="text-neutral-200 font-semibold text-center text-xs " >{item.name}</Text>
                    </View> )
              })
          }
         
            
        </View>
        
        {/*Descriptipn */}
        <Text className="text-neutral-400 mx-4 tracking-wide my-2">{movie?.overview}</Text>

        
        
     
        {/*Cast*/}
        <Cast navigation ={navigation} cast={cast}></Cast>
        
        {/*Similar Movies*/}
        <MovieList title="Similar Movies" hideSeeAll={true} data={smilarMovies} />
  
        
      </View>
      
    </ScrollView>
   
    </>
  )
}