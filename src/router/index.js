import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import History from '../pages/History'
import MovieShow from '../pages/MovieShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/history',
      name: 'History',
      component: History
    },
    {
      path: '/movie/:movie_id',
      name: 'MovieShow',
      component: MovieShow
    }
  ]
})
