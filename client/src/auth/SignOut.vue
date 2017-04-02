<template>
  <h1 class="message">You've been signed out.</h1>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  created() {
    this.signOut()
  },

  methods: {
    ...mapActions({
      signOut: 'signOut',
    }),
  },
}
</script>

<style scoped>
h1.message {
  text-align: center;
}
</style>
