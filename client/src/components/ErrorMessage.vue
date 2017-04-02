<template>
  <p v-if="hasError"
     class="error-message">{{ maybeMessage.getOrElse('An error has occurred') }}</p>
</template>

<script>
import { Maybe } from '../utils'

export default {
  props: {
    maybeMessage: { type: Maybe },
  },

  computed: {
    hasError() {
      return this.maybeMessage.matchWith({
        Nothing: () => false,
        Just: () => true,
      })
    }
  }
}
</script>

<style>

</style>
