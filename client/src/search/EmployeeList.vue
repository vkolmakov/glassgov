<template>
  <div v-if="ready">
    <div class="list-controls">
      <sort-select
          property-name="salary"
          :value="sortBySalaryDirection"
          :on-clear="clearSort"
          :on-ascend="sortBySalaryAsc"
          :on-descend="sortBySalaryDesc"></sort-select>
      <sort-select
          property-name="rating"
          :value="sortByRatingDirection"
          :on-clear="clearSort"
          :on-ascend="sortByRatingAsc"
          :on-descend="sortByRatingDesc"></sort-select>
    </div>

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
import SortSelect from './SortSelect.vue'
import Loading from '../components/Loading.vue'


export default {
  components: {
    EmployeeListEntry,
    SortSelect,
    Loading,
  },

  methods: {
    ...mapActions({
      clearSort: 'clearSort',
      sortBySalaryAsc: 'sortBySalaryAsc',
      sortBySalaryDesc: 'sortBySalaryDesc',
      sortByRatingAsc: 'sortByRatingAsc',
      sortByRatingDesc: 'sortByRatingDesc',
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
    sortByRatingDirection() {
      return this.maybeSortByRatingDirection.getOrElse('')
    },

    ...mapState({
      maybeEmployees: state => state.employees.selected,
      maybeSortBySalaryDirection: state => state.ui.search.sort.salary,
      maybeSortByRatingDirection: state => state.ui.search.sort.rating,
    }),

  },
}
</script>

<style>
.list-controls {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
}

.list-controls > * {
  flex: 0;
}
</style>
