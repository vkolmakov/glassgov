<template>
  <div>
    <employee :employee="employee" />
    <comment-list :maybeComments="comments" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Employee from './Employee.vue'
import CommentList from './CommentList.vue'

import { getComments } from '../api'
import { Maybe, compose } from '../utils'
import { missingEmployee } from '../constants'

export default {
  data() {
    return {
      id: parseInt(this.$route.params.id, 10),
      comments: Maybe.Nothing()
    }
  },

  created() {
    const { id, setComments } = this
    getComments(id)
      .then(
        compose(setComments, Maybe.Just),
        compose(setComments, Maybe.Nothing),
      )
  },

  components: {
    Employee,
    CommentList,
  },

  computed: {
    employee() {
      const { id } = this
      const { getEmployeeById }= this.$store.getters
      const maybeEmployee = getEmployeeById(id)

      return maybeEmployee.getOrElse(missingEmployee)
    }
  },

  methods: {
    setComments(comments) {
      this.comments = comments
    }
  }
}

</script>



<style>
</style>
