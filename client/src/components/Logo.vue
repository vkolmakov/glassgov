<template>
  <div>
    <link-wrapper text="GlassGov" :to="{ name: 'home' }">
      <h1 class="logo" >GlassGov</h1>
    </link-wrapper>
  </div>
</template>

<script>
import LinkWrapper from './LinkWrapper.vue'

export default {
  components: {
    LinkWrapper,
  },
}
</script>

<style scoped>
.logo {
  margin: 0;
  color: var(--secondary-color);
}
</style>
