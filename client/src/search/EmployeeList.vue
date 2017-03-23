<template>
  <div v-if="isReady">
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
import EmployeeListEntry from './EmployeeListEntry.vue'

import Loading from '../components/Loading.vue'

export default {
  props: ['maybeEmployees'],

  components: {
    EmployeeListEntry,
    Loading
  },

  computed: {
    isReady() {
      return this.maybeEmployees.matchWith({
        Just: () => true,
        Nothing: () => false,
      })
    },
    employees() {
      return this.maybeEmployees.getOrElse([])
    }
  },
}
</script>
