<template>
  <div class="container">
    <employee-list-entry />
    <comments />
  </div>
</template>

<script>
import EmployeeListEntry from '../components/EmployeeListEntry.vue'
import Comments from './Comments.vue'

export default {
  components: {
    EmployeeListEntry,
    Comments,
  }
}

</script>



<style>
</style>
