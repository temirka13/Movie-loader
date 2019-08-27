<template>
  <div class="home container">
    <div class="row">
      <div class="col-md-2">
        <MovieMenu/>
      </div>
      <div class="col-md-10">
        <div class="row">
          <SearchBar/>
          <div v-if="loading" class="mt100 text-center col-2 offset-5">
            <div class="spinner-border text-danger" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <MovieCard v-else v-for="(movie, index) in movies" :key="index" :movie="movie"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

import SearchBar from '../components/SearchBar'
import MovieMenu from '../components/MovieMenu'
import MovieCard from '../components/MovieCard'

export default {
  components: { SearchBar, MovieMenu, MovieCard },
  name: 'Home',
  data () {
    return {
      api_key: 'c54153caa7091ff41e0586b9f2a23eb1',
      loading: true,
      movies: [],
      page: 1
    }
  },
  computed: mapState(['sort_name', 'query', 'genre']),
  watch: {
    sort_name (newSortName) {
      this.loading = true
      let sortName = newSortName.toLowerCase().split(' ').join('_') + '.desc'
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=${sortName}&include_adult=false&include_video=false&page=${this.page}`
      axios.get(url).then((res) => {
        this.movies = res.data.results
        this.loading = false
      })
    },
    query (query) {
      if (query === '') {
        this.loading = true
        let sortName = this.$store.state.sort_name.toLowerCase().split(' ').join('_') + '.desc'
        let urlQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=${sortName}&include_adult=false&include_video=false&page=${this.page}`
        axios.get(urlQuery).then((res) => {
          this.movies = res.data.results
          this.loading = false
        })
      } else {
        this.loading = true
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&language=en-US&query=${query}&page=${this.page}&include_adult=false`
        axios.get(url).then((res) => {
          this.movies = res.data.results
          this.loading = false
        }).catch(() => {
          console.log('Erorr')
        })
      }
    },
    genre (genre) {
      this.loading = true
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=${this.$store.state.sort_name}&include_adult=false&include_video=false&page=${this.page}${genre}`
      axios.get(url).then((res) => {
        this.movies = res.data.results
        this.loading = false
      })
    }
  },
  created () {
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&${this.page}`
    axios.get(url).then((res) => {
      this.movies = res.data.results
      this.loading = false
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mt100{
    margin-top: 100px;
  }
  .home{
    padding-top: 20px;
  }
</style>
