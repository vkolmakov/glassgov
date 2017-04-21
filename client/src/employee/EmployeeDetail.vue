<template>

  <div>
    <employee :employee="employee" />

    <add-rating-form v-if="authenticated && !alreadyRated"
                      :employee="employee"
                      :afterSubmitted="loadRatings"></add-rating-form>

    <error-message :maybeMessage="maybeError"></error-message>

    <rating-list :maybeRatings="maybeRatings" />
  </div>

</template>

<script>
import { mapGetters, mapState } from 'vuex'

import Employee from './Employee.vue'
import RatingList from './RatingList.vue'
import AddRatingForm from './AddRatingForm.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

import { getRatings, getRatingStatusForUser } from '../api'
import { Maybe, compose } from '../utils'
import { missingEmployee } from '../constants'

export default {
  data() {
    return {
      id: this.$route.params.id,
      maybeRatings: Maybe.Nothing(),
      maybeError: Maybe.Nothing(),
      alreadyRated: true,
    }
  },

  created() {
    this.loadRatingStatusForUser()
    this.loadRatings()
  },

  components: {
    Employee,
    RatingList,
    AddRatingForm,
    ErrorMessage,
  },

  computed: {
    employee() {
      const { id } = this
      const { getEmployeeById }= this.$store.getters
      const maybeEmployee = getEmployeeById(id)

      return maybeEmployee.getOrElse(missingEmployee)
    },

    errorLoadingRatings() {
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
    loadRatingStatusForUser() {
      if (this.authenticated) {
        getRatingStatusForUser(this.id)
          .then(result => this.alreadyRated = result)
      }
    },

    loadRatings() {
      const { id, clearRatings, clearError,
              setError, setRatings, loadRatingStatusForUser } = this

      clearRatings()
      clearError()

      const handleSuccess = ratings => {
        setRatings(ratings)
        loadRatingStatusForUser()
        clearError()
      }

      const handleError = error => {
        clearRatings()
        setError(error.message)
      }

      getRatings(id)
        .then(
          handleSuccess,
          handleError
        )
    },

    setRatings(ratings) {
      this.maybeRatings = Maybe.Just(ratings)
    },

    clearRatings() {
      this.maybeRatings = Maybe.Nothing()
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
