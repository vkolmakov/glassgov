<template>
  <div>
    <link-wrapper text="GlassGov" :to="{ name: 'home' }">
      <img alt="glassgov" src=""/>
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
img {
  color: var(--secondary-color);
}
</style>
