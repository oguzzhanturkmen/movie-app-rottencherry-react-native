import { View, Text, SafeAreaView, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon , MagnifyingGlassIcon, HomeIcon, HeartIcon, BookmarkIcon, UserCircleIcon } from "react-native-heroicons/outline"
import {styles} from '../theme';
import TrendingMovies from '../components/trendingMovies';
import { useState } from 'react';
import MovieList from '../components/movieList';
const ios = Platform.OS === 'ios'
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { fetchNowPlaying, fetchTopRatedMovies, fetchUpcomingMovies, fetchtrendingMovies } from '../components/moviedb';
import { Dimensions } from 'react-native';
import Navigator from '../components/navigator';
import MovieListLand from '../components/movieListLand';
import { fetchPopularMovies } from '../components/moviedb';
import { fetchTrendingTv } from '../components/moviedb';
import TrendingTv from '../components/trendingTv';
import PeopleList from '../components/peopleList';
import { fetchTrendingPeople } from '../components/moviedb';
import NowPlaying from '../components/nowPlayin';
import { fetchPopularTv } from '../components/moviedb';
import TvListLand from '../components/tvListLand';
import { fetchTopRatedTv } from '../components/moviedb';
import TvList from '../components/tvList';


var {width , height} = Dimensions.get('window');
export default function HomeScreen() {
    
    const [trending, setTrending] = useState([])
    const [upcoming, setUpcoming] = useState([])
    const [topRated, setTopRated] = useState([])
    const navigation = useNavigation();
    const [loading , setLoading] = useState(false);
    const [homeColor , setHomeColor] = useState("white");
    const [heartColor , setHeartColor] = useState("white");
    const [popularMovies , setPopularMovies] = useState([]);
    const [trendingTv , setTrendingTv] = useState([]);
    const [people , setPeople] = useState([]);
    const [nowPlaying , setNowPlaying] = useState([]);
    const [popularTv , setPopularTv] = useState([]);
    const [topRatedTv , setTopRatedTv] = useState([]);

    const x =""



    useEffect(() => {
      getTrendingMovies();
      getUpcomingMovies();
      getTopRatedMovies();
      getPopularMovies();
      getTrendingTv();
      getPeople();
      getNowPlaying();
      getPopularTv();
      getTopRatedTv();

    }, [])

    getTrendingMovies = async () => {
      const data = await fetchtrendingMovies();
      
      if(data && data.results) setTrending(data.results);
    }

    getUpcomingMovies = async () => {
      const data = await fetchUpcomingMovies();
      
      if(data && data.results) setUpcoming(data.results);
    }

    getTopRatedMovies = async () => {
      const data = await fetchTopRatedMovies();
      
      if(data && data.results) setTopRated(data.results);
    }

    getPopularMovies = async () => {
      const data = await fetchPopularMovies();
      
      if(data && data.results) setPopularMovies(data.results);
    }
    getTrendingTv = async () => {
      const data = await fetchTrendingTv();
      console.log(data.results);
      
      if(data && data.results) setTrendingTv(data.results);
    }
    getPeople = async () => {
      const data = await fetchTrendingPeople();
      
      if(data && data.results) setPeople(data.results);
    }
    getNowPlaying = async () => {
      const data = await fetchNowPlaying();
      
      if(data && data.results) setNowPlaying(data.results);
    }

    getPopularTv = async () => {
      const data = await fetchPopularTv();
      
      if(data && data.results) setPopularTv(data.results);
    }

    getTopRatedTv = async () => {
      const data = await fetchTopRatedTv();
      
      if(data && data.results) setTopRatedTv(data.results);
    }





  return (
   
    <View className = "flex-1 bg-neutral-900  ">
      <SafeAreaView className = "mb-2 z-10">
        <StatusBar style="light" />
        <View className = "flex-row justify-between items-center mx-4">
            <Bars3CenterLeftIcon size= "30" strokeWidth = {2} color = "white" />
            <Text className = "text-white text-3xl font-bold ">rotten <Text style={styles.text} >cherry </Text></Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <UserCircleIcon size= "33" strokeWidth = {2} color={"#9A3B3B"}  />
            </TouchableOpacity>
        </View>
        </SafeAreaView>
        
        {loading ? (<Loading />) : (<ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        >
        {/*Trending Movies Carousel*/}
        {trending && <TrendingMovies data={trending}/>}
        <MovieListLand title="PopularMovies" data={popularMovies} />
        {/*Upcoming Movies Row*/}
        <MovieList title="Upcoming Movies" data={upcoming} />
        
        <NowPlaying data={nowPlaying}></NowPlaying>

         {/*Upcoming Movies Row*/}
         <MovieList title="Top Rated Movies" data={topRated} />

         <PeopleList title="Popular People" data={people} />

         {trendingTv &&<TrendingTv data={trendingTv}/>}

         <TvListLand title="Popular Tv Shows" data={popularTv} />

          <TvList title="Top Rated Tv Shows" data={topRatedTv} />

        

        

        

         


      </ScrollView>)}
      
        
    

    </View>
  )
}

