<template>
  <span @click="onRedirect">
    <router-link :to="to">
      <slot></slot>
    </router-link>
  </span>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props: ['to'],
  methods: {
    onRedirect() {
      this.closeSearch()
    },
    ...mapActions({
      closeSearch: 'closeSearch',
    }),
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
