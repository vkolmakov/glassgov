<template>
  <div>
    <h1>Employee list!</h1>
    <employee-list-entry
        v-for="employee in employees"
        :key="employee.id"
        :employee="employee" />
  </div>
</template>

<script>
import EmployeeListEntry from './EmployeeListEntry.vue'

export default {
  props: ['employees'],

  components: {
    EmployeeListEntry,
  }
}
</script>
