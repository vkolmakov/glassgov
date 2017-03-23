<template>
  <nav>
    <ul>
      <li><logo /></li>
      <li><search /></li>
      <li><link-wrapper :to="{ name: 'signin' }">Sign In</link-wrapper></li>
      <li><link-wrapper :to="{ name: 'signup' }">Sign Up</link-wrapper></li>
    </ul>
  </nav>
</template>

<script>
import Logo from './Logo.vue'
import LinkWrapper from './LinkWrapper.vue'
import Search from '../search/Search.vue'

export default {
  components: {
    Logo,
    LinkWrapper,
    Search,
  }
}
</script>

<style>
nav {
  background: var(--primary-color);
  text-align: center;
}

nav > ul {
  max-width: 50em;
  margin: 0 auto;
  padding: 1em;
  list-style-type: none;
}

nav > ul > li > a {
  color: var(--secondary-color);
}
</style>
