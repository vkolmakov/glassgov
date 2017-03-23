<template>
  <router-link :to="to">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: ['to'],
}
</script>

<style scoped>
a {
  text-decoration: none;
}
</style>
