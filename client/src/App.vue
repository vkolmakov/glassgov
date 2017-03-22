<template>
  <div id="app">
    <navbar />
    <employee-list v-if="isSearching" :maybeEmployees="selectedEmployees" />
    <router-view v-else></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Navbar from './components/Navbar.vue'
import EmployeeList from './components/EmployeeList.vue'

export default {
  components: {
    Navbar,
    EmployeeList,
  },

  computed: mapState({
    isSearching: state => state.ui.search.isSearching,
    selectedEmployees: state => state.employees.selected,
  }),

  created() {
    this.loadEmployees()
  },

  methods: mapActions({
    loadEmployees: 'loadEmployees',
  })
}
</script>

<style>
:root {
  --text-color: #444;
  --text-em-color: #222;
  --primary-color: #77a3f5;
}

body {
  margin: 0 auto;
  max-width: 50em;
  font-family: "Open Sans", "Helvetica", "Arial", sans-serif;
  line-height: 1.5;
  padding: 0 1.5em;

  color: var(--text-color);
}

h1, h2 {
  color: var(--text-em-color);
}

a {
  color: var(--primary-color);
}
</style>
