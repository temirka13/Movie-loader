import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home'
import Hystory from '../pages/Hystory'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hystory',
      name: 'Hystory',
      component: Hystory
    }
  ]
})
