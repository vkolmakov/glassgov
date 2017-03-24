<template>
  <star-rating
      :read-only="!writable"
      :rating="rating"
      :increment="writable ? 1.0 : 0.01"
      :active-color="primaryColor"
      :inactive-color="tertiaryColor"
      :border-color="secondaryColor"
      :show-rating="!hideText"
      :star-size="25"></star-rating>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  props: ['rating', 'writable', 'hideText'],
  components: {
    StarRating,
  },
  methods: {
    getCssVariable(name) {
      return window.getComputedStyle(document.body).getPropertyValue(name)
    },
  },
  computed: {
    primaryColor() {
      return this.getCssVariable('--primary-color')
    },
    secondaryColor() {
      return this.getCssVariable('--secondary-color')
    },
    tertiaryColor() {
      return this.getCssVariable('--tertiary-color')
    }
  },
}
</script>
