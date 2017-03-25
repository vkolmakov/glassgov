<template>
  <star-rating
      text-class="star-rating-label"
      :read-only="!writable"
      :rating="rating"
      :increment="writable ? 1.0 : 0.1"
      :active-color="primaryColor"
      :inactive-color="secondaryColor"
      :border-color="tertiaryColor"
      :border-width="2"
      :show-rating="!hideText"
      :star-size="14"></star-rating>
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

<style>
.star-rating-label {
  font-size: 14px;
  margin-bottom: 8px;
  margin-left: 7px;
}
</style>
