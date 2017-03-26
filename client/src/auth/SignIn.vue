<template>
  <form-template
      :title="form.title"
      :fields="form.fields"
      :submitButtonText="form.submitButtonText"
      :onSubmit="form.onSubmit"></form-template>
</template>

<script>
import FormTemplate from '../components/FormTemplate.vue'

export default {
  components: {
    FormTemplate,
  },
  data() {
    return {
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
        onSubmit: formData => console.log("submitted!", formData)
      }
    }
  }
}
</script>
