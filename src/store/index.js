import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    sort_name: 'Popularity',
    query: '',
    genre: ''
  },
  mutations: {
    SET_STORE_NAME: (state, name) => {
      state.sort_name = name
    },
    SET_QUERY: (state, query) => {
      state.query = query
    },
    SET_GENRE: (state, genre) => {
      state.genre = `&with_genres=${genre}`
    }
  }
})
