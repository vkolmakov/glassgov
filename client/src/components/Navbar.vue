<template>
  <nav>
    <logo />
    <search />
    <link-wrapper :to="{ name: 'signin' }">Sign In</link-wrapper>
    <link-wrapper :to="{ name: 'signup' }">Sign Up</link-wrapper>
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
