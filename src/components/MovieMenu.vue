<template>
  <div class="movie-menu">
    <div class="btn-group-vertical w100">
        <button  v-for="(genre, index) in genres" :key="index" @click="setGenre(genre.id)" type="button" class="btn btn-secondary">{{ genre.name }}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      genres: []
    }
  },
  created () {
    this.getGenres()
  },
  methods: {
    setGenre (id) {
      this.$store.commit('SET_GENRE', id)
      this.$router.push({ path: '/', query: { movie_id: id } })
    },
    getGenres () {
      const genresUrl = 'https://api.themoviedb.org/3/genre/movie/list?api_key=c54153caa7091ff41e0586b9f2a23eb1&language=en-US'
      axios.get(genresUrl).then((res) => {
        this.genres = res.data.genres
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .w100{
        width: 100%;
    }
</style>
