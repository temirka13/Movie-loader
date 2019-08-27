<template>
  <div class="movie-card col-md-4 mb20">
      <div style="width: 18rem;">
        <div class="card-body">
            <img v-if="movie.poster_path" :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="card-img-top poster" alt="404">
            <div v-else class="poster404">
              <p class="poster404-title">Poster not found</p>
            </div>
            <h5 class="card-title">{{movie.title}} ({{movie.vote_average}})</h5>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['movie'],
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style leng="scss" scoped>
  .mb20{
    margin-bottom: 20px;
  }
  .card-title{
    margin-top: 10px;
  }
  .movie-card{
    animation-duration: 2s;
    animation-name: show;
    transition: all 0.1s ease-out;
    cursor: pointer;
  }
  .card-body{
    padding: 0;
  }
  .poster404 {
    background-color: rgb(230, 230, 230);
    border-radius: 5px;
    width: 100%;
    height: 432px;
  }
  .poster404-title{
    text-align: center;
    padding-top: 50%;
  }
  .poster{
    height: 432px;
    object-fit: cover;
    transition: all 0.1s ease-out;
    border-radius: 5px;
  }
  .movie-card:hover .poster{
    margin-top: -10px;
    margin-bottom: 10px;
    box-shadow: 0px 5px 7px rgba(19, 19, 19, 0.8);
  }

  @keyframes show {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
