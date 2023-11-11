import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { Image } from 'react-native';
import { Dimensions } from 'react-native';
import { BookmarkIcon, HeartIcon, StarIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TouchableWithoutFeedback} from 'react-native';
import { TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchFavoritedMovies } from './moviedb';
import { postFavoritedMovie } from './moviedb';
import { deleteFavoritedMovie } from './moviedb';



var {width , height} = Dimensions.get('window');
export default function NowPlaying({data}) {
   


    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie' , item)
        
    }
    

   
   
  return (
    <View className="mb-8 space-y-4">
      <Text className = "text-white text-xl mx-4">Now Playing : Movies</Text>
      <ScrollView 
      contentContainerStyle={{ paddingBottom: 15  }}
      vertical={true} >
      
      <Carousel
      data = {data}
      renderItem={({item}) => <MovieCard  item={item} handleClick={handleClick} />}
      firstItem={1}
      layout={'tinder'} layoutCardOffset={`1`}
      sliderWidth={width}
      itemWidth={width * 0.6}
      enableMomentum={true}
      lockScrollWhileSnapping={true}
      autoplay={true}
      autoplayInterval={4000}


      
      loop={true}
      slideStyle={{display: 'flex', alignItems: 'center'}}
        />
           
        
      </ScrollView>
    </View>
  )
}

function MovieCard({item, handleClick }) {

   
    const [favoriteId, setFavoriteId] = useState(0)
    const [color, toggleColor] = useState(false)
    const [movieId, setMovieId] = useState(0)
    const [favorites, setFavorites] = useState([])

   

    getFavorites = async () => {
        const data = await fetchFavoritedMovies();
        
        if(data) setFavorites(data);

    }


    useEffect(() => {
        
        getFavorites();
        checkFavorites(item.id);
        
        
         }, [])

    

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
    <TouchableOpacity className="flex-row justify-around  space-x-1 bg-neutral-800 rounded-3xl space-y-2 mb-2 overflow-hidden " 
    style={{width:width * 0.97 , height : height * 0.15}}
    onPress={() => handleClick(item)
    }activeOpacity={0.90}
   >
        
        <ImageBackground 
       source={{uri : "https://image.tmdb.org/t/p/w1280" + item.backdrop_path}}
        style={{width:width * 1 , height : height * 0.2 , opacity:0.5,  position: 'absolute', left: 0, top: 0 , zIndex:-1}}
        className="rounded rounded-3xl overflow-hidden "
        blurRadius={10}>
             </ImageBackground>
            
            <View className=" shadow-2xl shadow-black mr-1  "  >
            <Image
            source={{uri : "https://image.tmdb.org/t/p/w1280" + item.poster_path}}
            style={{width:84, height : 110  }} 
            className = "rounded-xl shadow-3xl shadow-black  "/>
            </View>
            <View className ="flex-col ">
            <Text className = "text-white font-bold  text-base mt-1" style={{width : width * 0.60 , lineHeight : 17}}>{item.title}</Text>
            <View className="flex-row items-center space-x-1">
                <StarIcon size="20" strokeWidth={2} color = "yellow" fill="yellow" className=""/>
            <Text className = " text-white font-bold">{item.vote_average.toString().slice(0,3)}</Text>
            </View>
            <Text style = {{width : width * 0.6 , lineHeight : 14}} className = "text-neutral-300 text-xs font-semibold">{item.overview.length > 150 ? item.overview.slice(0, 150) + "..." : item.overview}</Text>
            </View>
            <View className="flex-col justify-center space-y-4 mr-2" style={{width : width * 0.1}}>
                <TouchableOpacity 
                onPress={() => {
                    if(color){
                        console.log(favoriteId)
                        
                      deleteFavoritedMovie(favoriteId)
                      toggleColor(!color)
                    }
                    else{
                      const data = {
                        userId : 1,
                        movieId: item.id,
                        movieName: item.title,
                        posterPath: item.poster_path
                      }
                      postFavoritedMovie(data)
                      toggleColor(!color)
                    }
                  }}>
            <HeartIcon size="40" strokeWidth={2} color={color ? "red" : "white"} className=""/>
            </TouchableOpacity>
            <TouchableOpacity>
            <BookmarkIcon size="40" strokeWidth={2} color = "white" fill="white" className=""/>
            </TouchableOpacity>
            </View>
            
       
            </TouchableOpacity>
  )
}