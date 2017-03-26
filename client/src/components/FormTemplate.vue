<template>

  <div class="form-container">
    <h1>{{ title }}</h1>

    <form @submit.prevent="handleSubmit">
      <div v-for="field in fields" class="form-group">
        <label :for="field.name">{{ field.label }}</label>
        <input :type="field.type" :name="field.name" />
      </div>

      <div class="form-group">
        <input name="" type="submit" :value="submitButtonText" />
      </div>
    </form>
  </div>

</template>

<script>
import { map, dropLast, compose, path, prop, zipObj } from '../utils'

export default {
  props: {
    title: { type: String },
    fields: { type: Array },
    submitButtonText: { type: String },
    onSubmit: { type: Function },
  },

  methods: {
    handleSubmit(event) {
      const getElements = path(['target', 'elements'])
      const getElementValue = prop('value')
      const dropLastOne = dropLast(1)

      const fieldNames = map(prop('name'), this.fields)
      const zipWithFieldNames = zipObj(fieldNames)

      const getValues = compose(map(getElementValue), dropLastOne, getElements)
      const getResult = compose(zipWithFieldNames, getValues)

      this.onSubmit(getResult(event))
    }
  }
}
</script>
