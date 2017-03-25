<template>

  <div v-if="ready" class="featured-list">
    <featured-employee
        :key="employee.id"
        v-for="employee in employees"
        :employee="employee"></featured-employee>
  </div>

  <div v-else class="featured">
    <loading></loading>
  </div>

</template>

<script>
import Loading from '../components/Loading.vue'
import FeaturedEmployee from './FeaturedEmployee.vue'

export default {
  props: ['maybeFeatured'],
  components: {
    Loading,
    FeaturedEmployee,
  },

  computed: {
    ready() {
      return this.maybeFeatured.matchWith({
        Just: () => true,
        Nothing: () => false,
      })
    },
    employees() {
      return this.maybeFeatured.getOrElse([])
    }
  }
}
</script>

<style>
.featured-list {
  display: flex;
  flex-flow: column wrap;
  justify-content: space-around;
}
</style>
