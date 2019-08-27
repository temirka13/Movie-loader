<template>
<div class="search-bar col-12">
  <div class="row">
    <div class="col-md-9">
      <div class="input-group mb-3">
        <input v-model="query" v-on:keyup.enter="setQuery" type="text" class="form-control" placeholder="Enter movie title" aria-label="Enter movie title" aria-describedby="button-addon2">
        <div class="input-group-append">
          <button @click="setQuery" class="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="btn-group w100">
        <button type="button" disabled class="btn btn-danger btn-dis">{{$store.state.sort_name}}</button>
        <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu">
          <p v-for="(name, index) in sort_names" :key="index" @click="setSortName(name)" class="dropdown-item">{{name}}</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      sort_names: [
        'Popularity',
        'Release date',
        'Revenue',
        'Primary release date',
        'Original title',
        'Vote average',
        'Vote count'
      ]
    }
  },
  methods: {
    setSortName (name) {
      this.$store.commit('SET_STORE_NAME', name)
      this.$store.commit('SET_QUERY', '')
      this.query = ''
    },
    setQuery () {
      this.$store.commit('SET_QUERY', this.query)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .w100{
    width: 100%;
  }
  .search-bar{
    margin-bottom: 10px;
  }
  .btn-dis{
    opacity: 1
  }
  .dropdown-item:hover{
    cursor: pointer;
  }
</style>
