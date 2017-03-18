<template>
  <nav>
    <logo />
    <search />
    <link-wrapper text="Sign In" url="/signin" />
    <link-wrapper text="Sign Up" url="/signup" />
  </nav>
</template>

<script>
import Logo from './Logo.vue'
import LinkWrapper from './LinkWrapper.vue'
import Search from './Search.vue'

export default {
  components: {
    Logo,
    LinkWrapper,
    Search,
  }
}
</script>

<style>
</style>
