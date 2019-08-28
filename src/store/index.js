import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let historyInitialState
let getlocalStorage = () => {
  let localHistory = JSON.parse(localStorage.getItem('history_movies'))
  console.log(localHistory)
  if (localHistory.length < 1) {
    historyInitialState = []
  } else {
    historyInitialState = localHistory
  }
}

getlocalStorage()

export const store = new Vuex.Store({
  state: {
    sort_name: 'Popularity',
    query: '',
    genre: '',
    history: historyInitialState
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
    },
    SET_HISTORY: (state, historyMovie) => {
      let history = []
      console.log(historyInitialState)
      if (state.history.length <= 0) {
        history.push(historyMovie)
        state.history = [historyMovie]
      } else {
        state.history.forEach(el => {
          if (el.id !== historyMovie.id) {
            history.push(el)
          }
        })
        history.push(historyMovie)
        state.history = history
        localStorage.setItem('history_movies', JSON.stringify(history))
      }

      // localStorage.setItem("history_movie", auth);
      // state.history.push(movie)
    }
  }
})
