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
        v-for="(employee, idx) in renderedEmployees"
        :key="idx"
        :employee="employee" />
    <infinite-loading
        :on-infinite="onInfinite"
        ref="infiniteLoading"></infinite-loading>
  </div>

  <div v-else>
    <loading />
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex'
import { slice } from '../utils'

import InfiniteLoading from 'vue-infinite-loading'
import EmployeeListEntry from './EmployeeListEntry.vue'
import SortSelect from './SortSelect.vue'
import Loading from '../components/Loading.vue'


export default {
  components: {
    EmployeeListEntry,
    SortSelect,
    Loading,
    InfiniteLoading,
  },

  data() {
    return {
      renderedEmployees: [],
      batchesRendered: 0,
    }
  },

  methods: {
    onEmployeeListUpdate() {
      this.$nextTick(() => {
        this.batchesRendered = 0
        this.renderedEmployees = []
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      })
    },

    onInfinite() {
      const renderAtOnce = 10
      this.batchesRendered += 1

      const renderedCount = this.batchesRendered * renderAtOnce
      this.renderedEmployees = slice(0, renderedCount, this.employees)

      if (renderedCount > this.employees.length)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      else
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
    },

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
      maybeEmployees: function (state) {
        this.onEmployeeListUpdate()
        return state.employees.selected
      },
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
  margin-left: 0.5em;
}
</style>
