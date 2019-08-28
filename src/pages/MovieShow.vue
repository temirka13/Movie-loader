<template>
  <div class="movie-show">
    <div class="container">
      <div v-if="loading" class="mt100 text-center col-2 offset-5">
        <div class="spinner-border text-danger" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <div v-else class="row">
        <div class="col-md-4">
          <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="card-img-top poster" alt="404">
        </div>
        <div class="col-md-8">
          <h1>{{movie.title}}</h1>
          <h4>{{movie.tagline}}</h4>
          <p>Vote average: {{movie.vote_average}}</p>
          <p>Runtime: {{movie.runtime}}</p>
          <p>Release date: {{movie.release_date}}</p>
          <p>Popularity: {{movie.popularity}}</p>
          <p></p>
          <p>Overview: {{movie.overview}}</p>
          <div class="btn-group" role="group" aria-label="First group">
            <button v-for="(genre, index) in movie.genres" :key="index" @click="setGenre(genre.id)" type="button" class="btn btn-secondary">{{genre.name}}</button>
          </div>
        </div>
        <div class="col-12">
          <h2 class="text-center mb20">Similar movies</h2>
        </div>
        <MovieCard v-for="(movie, index) in similar_movies" :key="index" :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

import MovieCard from '../components/MovieCard'

export default {
  components: { MovieCard },
  name: 'MovieView',
  data () {
    return {
      api_key: 'c54153caa7091ff41e0586b9f2a23eb1',
      loading: true,
      movie: {},
      similar_movies: []
    }
  },
  created () {
    this.getMovieDetails()
    this.getSimilarMovies()
  },
  watch: {
    '$route' (route) {
      this.getMovieDetails(route.params.movie_id)
      this.getSimilarMovies(route.params.movie_id)
    }
  },
  methods: {
    getMovieDetails (movieId) {
      this.loading = true
      let params
      if (movieId) {
        params = movieId
      } else {
        params = this.$route.params.movie_id
      }
      let url = `https://api.themoviedb.org/3/movie/${params}?api_key=${this.api_key}&language=en-US`
      axios.get(url).then((res) => {
        this.movie = res.data
        this.$store.commit('SET_HISTORY', res.data)
        this.loading = false
      })
    },
    getSimilarMovies (movieId) {
      this.loading = true
      let params
      if (movieId) {
        params = movieId
      } else {
        params = this.$route.params.movie_id
      }
      let url = `https://api.themoviedb.org/3/movie/${params}/similar?api_key=${this.api_key}&language=en-US&page=1`
      axios.get(url).then((res) => {
        this.similar_movies = res.data.results
        this.loading = false
      })
    },
    setGenre (id) {
      this.$store.commit('SET_GENRE', id)
      this.$router.push({ path: '/', query: { movie_id: id } })
    }
  }
}
</script>

<style scoped>
  .mb20{
    margin-bottom: 20px;
  }
  .movie-show{
    margin-top: 20px;
  }
  .mt100{
    margin-top: 100px;
  }
</style>
