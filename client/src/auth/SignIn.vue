<template>

  <div v-if="!submitting" class="sign-in-form">
    <form-template
        :title="form.title"
        :fields="form.fields"
        :submitButtonText="form.submitButtonText"
        :onSubmit="form.onSubmit"></form-template>
    <error-message :maybeMessage="maybeError"></error-message>
  </div>

  <div v-else class="sign-in-form">
    <loading></loading>
  </div>

</template>

<script>
import { mapActions } from 'vuex'
import { Maybe } from '../utils'

import FormTemplate from '../components/FormTemplate.vue'
import Loading from '../components/Loading.vue'
import ErrorMessage from '../components/ErrorMessage.vue'

export default {
  components: {
    FormTemplate,
    Loading,
    ErrorMessage,
  },

  data() {
    return {
      submitting: false,
      maybeError: Maybe.Nothing(),
      form: {
        title: 'Sign In',
        submitButtonText: 'Sign In',
        fields: [{
          name: 'email',
          label: 'Email',
          type: 'email',
          validate: email => email && email.includes('@') && email.includes('.'),
        }, {
          name: 'password',
          label: 'Password',
          type: 'password',
          validate: password => password && password.length > 8,
        }],
        onSubmit: ({ email, password }) => {
          const { showSpinner, hideSpinner, signIn, setError, clearError } = this
          const handleError = () => {
            hideSpinner()
            setError()
          }

          showSpinner()
          clearError()

          signIn({ email, password })
            .then(hideSpinner)
            .catch(handleError)
        },
      },
    }
  },

  methods: {
    showSpinner() {
      this.submitting = true
    },

    hideSpinner() {
      this.submitting = false
    },

    setError() {
      console.log('setting error!')
      this.maybeError = Maybe.Just('Invalid email or password')
    },

    clearError() {
      this.maybeError = Maybe.Nothing()
    },

    ...mapActions({
      signIn: 'signIn',
    }),
  },
}
</script>
