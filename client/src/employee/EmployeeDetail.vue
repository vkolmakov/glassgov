<template>

  <div>
    <employee :employee="employee" />

    <add-comment-form v-if="authenticated"
                      :employee="employee"
                      :afterSubmitted="loadComments"></add-comment-form>

    <p class="error-message" v-if="errorLoadingComments">{{ maybeError.getOrElse('Error loading comments.') }}</p>
    <comment-list v-else :maybeComments="maybeComments" />
  </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Employee from './Employee.vue'
import CommentList from './CommentList.vue'
import AddCommentForm from './AddCommentForm.vue'

import { getComments } from '../api'
import { Maybe, compose } from '../utils'
import { missingEmployee } from '../constants'

export default {
  data() {
    return {
      id: parseInt(this.$route.params.id, 10),
      maybeComments: Maybe.Nothing(),
      maybeError: Maybe.Nothing(),
    }
  },

  created() {
    this.loadComments()
  },

  components: {
    Employee,
    CommentList,
    AddCommentForm,
  },

  computed: {
    employee() {
      const { id } = this
      const { getEmployeeById }= this.$store.getters
      const maybeEmployee = getEmployeeById(id)

      return maybeEmployee.getOrElse(missingEmployee)
    },

    errorLoadingComments() {
      return this.maybeError.matchWith({
        Nothing: () => false,
        Just: () => true,
      })
    },

    ...mapState({
      authenticated: state => state.auth.authenticated,
    })
  },

  methods: {
    loadComments() {
      const { id, clearComments, clearError, setError, setComments } = this

      clearComments()
      clearError()

      const handleSuccess = comments => {
        setComments(comments)
        clearError()
      }

      const handleError = error => {
        clearComments()
        setError(error.message)
      }

      getComments(id)
        .then(
          handleSuccess,
          handleError
        )
    },

    setComments(comments) {
      this.maybeComments = Maybe.Just(comments)
    },

    clearComments() {
      this.maybeComments = Maybe.Nothing()
    },

    clearError() {
      this.maybeError = Maybe.Nothing()
    },

    setError(message) {
      this.maybeError = Maybe.Just(message)
    },
  },
}

</script>

<style>
.error-message {
  text-align: center;
  color: var(--danger-color);
  font-weight: bold;
  font-size: 1.5rem;
}
</style>
