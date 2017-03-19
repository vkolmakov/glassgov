<template>
  <div>
    <link-wrapper v-for="employee in employees"
                  :key="employee.id"
                  :to="{ name: 'employee', params: { id: employee.id } }">
      <employee-list-entry :employee="employee" />
    </link-wrapper>
  </div>
</template>

<script>
import EmployeeListEntry from './EmployeeListEntry.vue'
import LinkWrapper from './LinkWrapper.vue'

export default {
  props: ['employees'],

  components: {
    EmployeeListEntry,
    LinkWrapper,
  }
}
</script>
