<template>
  <form-template
      :title="form.title"
      :fields="form.fields"
      :submitButtonText="form.submitButtonText"
      :onSubmit="form.onSubmit"></form-template>
</template>

<script>
import { MIN_PASSWORD_LENGTH } from '../constants'

import FormTemplate from '../components/FormTemplate.vue'

export default {
  components: {
    FormTemplate,
  },
  data() {
    return {
      form: {
        title: 'Sign Up',
        submitButtonText: 'Sign Up',
        fields: [{
          name: 'email',
          label: 'Email',
          type: 'email',
          validation: {
            validate: email => email && email.includes('@') && email.includes('.'),
            hasError: false,
            errorMessage: 'Please enter a valid email',
          },
        }, {
          name: 'password',
          label: 'Password',
          type: 'password',
          validation: {
            validate: password => password && password.length >= MIN_PASSWORD_LENGTH,
            hasError: false,
            errorMessage: `Password must be longer than ${MIN_PASSWORD_LENGTH} digits`,
          },
        }, {
          name: 'repeat-password',
          label: 'Repeat Password',
          type: 'password',
          validation: {
            validate: (repeatPassword, otherFields) => otherFields.password === repeatPassword,
            hasError: false,
            errorMessage: `Passwords must match!`,
          },
        }],
        onSubmit: formData => console.log("submitted!", formData)
      }
    }
  }
}
</script>
