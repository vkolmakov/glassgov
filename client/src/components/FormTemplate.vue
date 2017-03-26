<template>

  <div class="form-container">
    <h1>{{ title }}</h1>

    <form @submit.prevent="handleSubmit">
      <div v-for="field in fields" class="form-group">
        <label :for="field.name">{{ field.label }}</label>
        <input :type="field.type" :name="field.name" />
      </div>

      <div class="form-group submit">
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

<style>
.form-container {
  max-width: 25em;
  margin: 0 auto;
}

.form-group {
  margin: 1em 0;
  display: flex;
  flex-flow: row wrap;
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
</style>
