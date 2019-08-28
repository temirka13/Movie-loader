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
          <div class="col-12">
            <div class="row">
              <div class="col-md-1">
                <nav v-if="page !== 1" aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item" @click="setPage(-1)">Previous</li>
                  </ul>
                </nav>
            </div>
            <div class="col-md-1 offset-md-10">
              <nav v-if="page < total_pages" aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item" @click="setPage(+1)">Next</li>
                </ul>
              </nav>
            </div>
          </div>
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
      page: 1,
      total_pages: 2,
      route_query: ''
    }
  },
  created () {
    this.getMovies()
  },
  computed: mapState(['sort_name', 'query', 'genre']),
  watch: {
    sort_name (newSortName) {
      this.getMoviesBySortName(newSortName)
    },
    query (query) {
      this.getMoviesByQuery(query)
    },
    genre (genre) {
      this.getMoviesByGenre(genre)
    },
    page (page) {
      this.loading = true
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.page}`
      axios.get(url).then((res) => {
        this.movies = res.data.results
        this.total_pages = res.data.total_pages
        this.loading = false
      })
    }
  },
  methods: {
    getMovies () {
      let url
      if (this.$route.query.movie_id) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=${this.$store.state.sort_name}&include_adult=false&include_video=false&page=${this.page}&with_genres=${this.$route.query.movie_id}`
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&${this.page}`
      }
      axios.get(url).then((res) => {
        this.movies = res.data.results
        this.total_pages = res.data.total_pages
        this.loading = false
      })
    },
    getMoviesBySortName (newSortName) {
      this.loading = true
      let sortName = newSortName.toLowerCase().split(' ').join('_') + '.desc'
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=${sortName}&include_adult=false&include_video=false&page=${this.page}`
      axios.get(url).then((res) => {
        this.movies = res.data.results
        this.total_pages = res.data.total_pages
        this.loading = false
      })
    },
    getMoviesByQuery (query) {
      if (query === '') {
        this.loading = true
        let sortName = this.$store.state.sort_name.toLowerCase().split(' ').join('_') + '.desc'
        let urlQuery = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=${sortName}&include_adult=false&include_video=false&page=${this.page}`
        axios.get(urlQuery).then((res) => {
          this.movies = res.data.results
          this.total_pages = res.data.total_pages
          this.loading = false
        })
      } else {
        this.loading = true
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${this.api_key}&language=en-US&query=${query}&page=${this.page}&include_adult=false`
        axios.get(url).then((res) => {
          this.movies = res.data.results
          this.total_pages = res.data.total_pages
          this.loading = false
        })
      }
    },
    getMoviesByGenre (genre) {
      this.loading = true
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${this.api_key}&language=en-US&sort_by=${this.$store.state.sort_name}&include_adult=false&include_video=false&page=${this.page}${genre}`
      axios.get(url).then((res) => {
        this.movies = res.data.results
        this.total_pages = res.data.total_pages
        this.loading = false
      })
    },
    setPage (index) {
      if (index === +1) {
        this.page += 1
      } else {
        this.page -= 1
      }
    }
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
  .page-item{
    padding: 5px 10px;
    border-radius: 3px;
    border: 1px solid #dc3545;
    transition: all 0.2s ease-out;
    cursor: pointer;
  }
  .page-item:hover{
    background-color: #dc3545;
    color: #fff;
  }
</style>
