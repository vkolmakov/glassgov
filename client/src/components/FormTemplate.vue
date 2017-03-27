<template>

  <div class="form-container">
    <h1>{{ title }}</h1>

    <form @submit.prevent="handleSubmit">
      <div v-for="field in fields" :class="`form-group ${field.validation.hasError ? 'has-error' : ''}`">
        <label :for="field.name">{{ field.label }}</label>
        <label v-if="field.validation.hasError" class="error-message">{{ field.validation.errorMessage }}</label>
        <input :type="field.type" :name="field.name" />
      </div>

      <div class="form-group submit">
        <input name="" type="submit" :value="submitButtonText" />
      </div>
    </form>
  </div>

</template>

<script>
import { map, dropLast, compose, path, prop, zipObj, zip } from '../utils'

export default {
  props: {
    title: { type: String },
    fields: { type: Array },
    submitButtonText: { type: String },
    onSubmit: { type: Function },
  },

  methods: {
    getValues(event) {
      const getElements = path(['target', 'elements'])
      const getElementValue = prop('value')
      const dropLastOne = dropLast(1)

      const getValues = compose(map(getElementValue), dropLastOne, getElements)

      return getValues(event)
    },

    displayErrors(fieldsWithErrors) {
      this.fields.forEach(field => {
        if (fieldsWithErrors.find(f => f.name === field.name)) {
          field.validation.hasError = true
        }
      })
    },

    clearErrors() {
      this.fields.forEach(field => field.validation.hasError = false)
    },

    handleSubmit(event) {
      this.clearErrors()

      const values = this.getValues(event)
      const valuesWithFields = zip(values, this.fields)

      const fieldNames = map(prop('name'), this.fields)
      const zipWithFieldNames = zipObj(fieldNames)

      const fieldNameToValue = zipWithFieldNames(values)

      const fieldsWithErrors = valuesWithFields
        .filter(([value, field]) => !field.validation.validate(value, fieldNameToValue))
        .map(([value, field]) => field)

      if (fieldsWithErrors.length > 0) {
        this.displayErrors(fieldsWithErrors)
      } else {
        this.onSubmit(fieldNameToValue)
      }
    }
  }
}
</script>

<style>
.form-container {
  max-width: 25em;
  margin: 0 auto;
}

.form-group {
  margin: 1em 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

.form-group > label {
  font-size: 0.9rem;
}

.form-group > input {
  width: 100%;
  height: 1.6em;
  padding: 0.3em 1em;
  font-size: 0.9rem;
  border: .1em solid var(--tertiary-color);
  border-radius: 0.4em;
}

.form-group.submit {
  justify-content: flex-end;
}

.form-group.submit > input[type="submit"] {
  width: 20%;
  background-color: var(--primary-color);
  height: 2.2em;
  font-size: 0.9rem;
  color: var(--secondary-color);
}

.form-group.has-error {
  color: var(--danger-color);
}

.form-group.has-error > input {
  border: .1em solid var(--danger-color);
}
</style>
