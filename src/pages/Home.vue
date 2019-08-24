<template>
  <div class="home container">
      <div class="row">
          <div class="col-md-2">
              <MovieMenu/>
          </div>
          <div class="col-md-10">
              <div class="row">
                  <SearchBar/>
                  <MovieCard/>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import SearchBar from '../components/SearchBar'
import MovieMenu from '../components/MovieMenu'
import MovieCard from '../components/MovieCard'

export default {
  components: { SearchBar, MovieMenu, MovieCard },
  name: 'Home',
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .home{
        padding-top: 20px;
    }
</style>
