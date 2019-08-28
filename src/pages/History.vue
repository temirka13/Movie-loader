<template>
  <div class="hystory">
    <div class="container">
      <div class="row">
        <div v-if="loading" class="mt100 text-center col-2 offset-5">
          <div class="spinner-border text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
        <MovieCard class="hystory-movie" v-else v-for="(movie, index) in movies" :key="index" :movie="movie"/>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from '../components/MovieCard'

export default {
  components: { MovieCard },
  name: 'Hystory',
  data () {
    return {
      loading: true,
      movies: []
    }
  },
  created () {
    this.movies = this.$store.state.history
    this.loading = false
  }
}
</script>

<style scoped>
  .hystory{
    margin-top: 20px;
  }
  .hystory-movie{
    opacity: 0.5;
    transition: all 0.2s ease-out
  }
  .hystory-movie:hover{
    opacity: 1;
  }
</style>
