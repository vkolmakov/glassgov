<template>
  <div v-if="ready">
    <select @change="onSortBySalary" :value="sortBySalaryDirection">
      <option value="">Sort by Salary</option>
      <option :value="SORT_TYPES.DESC">Highest First</option>
      <option :value="SORT_TYPES.ASC">Lowest First</option>
    </select>

    <employee-list-entry
        v-for="(employee, idx) in employees"
        :key="idx"
        :employee="employee" />
  </div>

  <div v-else>
    <loading />
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'

import EmployeeListEntry from './EmployeeListEntry.vue'
import Loading from '../components/Loading.vue'

import { SORT_TYPES } from '../constants'


export default {
  components: {
    EmployeeListEntry,
    Loading
  },

  data() {
    return {
      SORT_TYPES,
    }
  },

  methods: {
    onSortBySalary(e) {
      const direction = e.target.value

      switch (direction) {
        case SORT_TYPES.ASC:
          this.sortBySalaryAsc()
          break
        case SORT_TYPES.DESC:
          this.sortBySalaryDesc()
          break
        default:
          this.clearSort()
          break
      }
    },

    ...mapActions({
      clearSort: 'clearSort',
      sortBySalaryAsc: 'sortBySalaryAsc',
      sortBySalaryDesc: 'sortBySalaryDesc',
    }),
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
    sortBySalaryDirection() {
      return this.maybeSortBySalaryDirection.getOrElse('')
    },

    ...mapState({
      maybeEmployees: state => state.employees.selected,
      maybeSortBySalaryDirection: state => state.ui.search.sort.salary,
    }),

  },
}
</script>
