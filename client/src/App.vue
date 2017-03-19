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
