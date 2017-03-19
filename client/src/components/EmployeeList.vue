<template>
  <div v-if="isReady">
    <link-wrapper v-for="employee in employees"
                  :key="employee.id"
                  :to="{ name: 'employee', params: { id: employee.id } }">
      <employee-list-entry :employee="employee" />
    </link-wrapper>
  </div>

  <div v-else>
    <Loading/>
  </div>

</template>

<script>
import EmployeeListEntry from './EmployeeListEntry.vue'
import LinkWrapper from './LinkWrapper.vue'
import Loading from './Loading.vue'

export default {
  props: ['maybeEmployees'],

  components: {
    EmployeeListEntry,
    LinkWrapper,
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
