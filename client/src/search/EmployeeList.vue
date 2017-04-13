<template>
  <div v-if="ready">
    <select v-model="filter">
      <option disabled>Sort by Salary</option>
      <option>Disable</option>
      <option>Highest First</option>
      <option>Lowest First</option>
    </select>

    <employee-list-entry
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee" />
  </div>

  <div v-else>
    <loading />
  </div>

</template>

<script>
import { mapState } from 'vuex'

import EmployeeListEntry from './EmployeeListEntry.vue'
import Loading from '../components/Loading.vue'

export default {
  components: {
    EmployeeListEntry,
    Loading
  },

  computed: {
    ready() {
      return this.maybeEmployees.matchWith({
        Just: () => true,
        Nothing: () => false,
      })
    },
    employees() {
      return this.maybeEmployees.getOrElse([])
    },
    ...mapState({
      maybeEmployees: state => state.employees.selected,
    }),

  },
}
</script>
