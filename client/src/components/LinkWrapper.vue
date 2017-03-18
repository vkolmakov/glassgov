<template>
  <a :href="url">{{ text }}</a>
</template>

<script>
export default {
  props: ['text', 'url'],
}
</script>
