import axios from 'axios'


const apiKey = '41e467c96314188cd667403a3df5dddd'
const baseUrl = 'https://api.themoviedb.org/3'
const trendingMoviesEndpoint = baseUrl + '/trending/movie/day?language=en-US&api_key=' + apiKey
const upcomingMoviesEndpoint = baseUrl + '/movie/upcoming?language=en-US&page=1&api_key=' + apiKey
const topRatedMoviesEndpoint = baseUrl + '/movie/top_rated?language=en-US&page=1&api_key=' + apiKey
const popularMoviesEndpoint = baseUrl + '/movie/popular?language=en-US&page=1&api_key=' + apiKey
const trendingTvEndpoint = baseUrl + '/trending/tv/day?language=en-US&api_key=' + apiKey
const trendingPeopleEndpoint = baseUrl + '/trending/person/day?language=en-US&api_key=' + apiKey
const movieDetailsEndpoint =  movieId => baseUrl + '/movie/' + movieId + '?language=en-US&api_key=' + apiKey
const movieCreditsEndpoint = movieId => baseUrl + '/movie/' + movieId + '/credits' + '?language=en-US&api_key=' + apiKey
const similarMoviesEndpoint = movieId => baseUrl + '/movie/' + movieId + '/similar' + '?language=en-US&api_key=' + apiKey
const personDetailsEndpoint = personId => baseUrl + '/person/' + personId + '?language=en-US&api_key=' + apiKey
const personMoviesEndpoint = personId => baseUrl + '/person/' + personId + '/movie_credits' + '?language=en-US&api_key=' + apiKey
const searchMoviesEndpoint = baseUrl + '/search/movie?language=en-US&page=1&include_adult=false&query='
const movieTrailerEndpoint = movieId => baseUrl + '/movie/' + movieId + '/videos' + '?language=en-US&api_key=' + apiKey
const multiSearchEndpoint = query =>  baseUrl + '/search/multi?language=en-US&page=1&include_adult=false&query=' + query + "&api_key=" + apiKey
const nowPlayingEndpoint = baseUrl + '/movie/now_playing?language=en-US&page=1&api_key=' + apiKey

const popularTvEndpoint = baseUrl + '/tv/popular?language=en-US&page=1&api_key=' + apiKey
const topRatedTvEndpoint = baseUrl + '/tv/top_rated?language=en-US&page=1&api_key=' + apiKey



const favoritedMoviesEndpoint = "http://localhost:8080/api/favorites";

const apiCall = async (endpoint , params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {},
    }

        try {
            const response = await axios.request(options)
            return response.data
        } catch (error) {
            console.log(error)
            return {}
        }
    }

    const deleteCall = async (endpoint , params) => {
        const options = {
            method: 'DELETE',
            url: endpoint,
            params: params ? params : {},
        }
    
            try {
                const response = await axios.request(options)
                return response.data
            } catch (error) {
                console.log(error)
                return {}
            }
        }

        const postCall = async (endpoint , data) => {
            
        
                try {
                    const response = await axios.post(endpoint , data)
                    
                } catch (error) {
                    console.log(error)
                    return {}
                }
            }

export const fetchtrendingMovies = () => apiCall(trendingMoviesEndpoint)

export const fetchUpcomingMovies = () => apiCall(upcomingMoviesEndpoint)

export const fetchTopRatedMovies = () => apiCall(topRatedMoviesEndpoint)

export const fetchMovieDetails = (movieId) => apiCall(movieDetailsEndpoint(movieId))

export const fetchMovieCredits = (movieId) => apiCall(movieCreditsEndpoint(movieId))

export const fetchSimilarMovies = (movieId) => apiCall(similarMoviesEndpoint(movieId))

export const fetchPersonDetails = (personId) => apiCall(personDetailsEndpoint(personId))

export const fetchPersonMovies = (personId) => apiCall(personMoviesEndpoint(personId)) 

export const fetchMovieTrailer = (movieId) => apiCall(movieTrailerEndpoint(movieId))

export const fetchSearchMovies = (query) => apiCall(multiSearchEndpoint(query))

export const fetchFavoritedMovies = () => apiCall(favoritedMoviesEndpoint)

export const deleteFavoritedMovie = (movieId) => deleteCall(favoritedMoviesEndpoint + "/" + movieId)

export const postFavoritedMovie = (data) => postCall(favoritedMoviesEndpoint , data)

export const fetchPopularMovies = () => apiCall(popularMoviesEndpoint)

export const fetchTrendingTv = () => apiCall(trendingTvEndpoint)

export const fetchTrendingPeople = () => apiCall(trendingPeopleEndpoint)

export const fetchNowPlaying = () => apiCall(nowPlayingEndpoint)

export const fetchPopularTv = () => apiCall(popularTvEndpoint)

export const fetchTopRatedTv = () => apiCall(topRatedTvEndpoint)
