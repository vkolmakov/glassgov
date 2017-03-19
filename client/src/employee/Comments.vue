<template>
  <div>

    <ul v-if="ready">
      <li v-for="c in comments">
        {{ c.user }}: {{ c.comment}} - {{ c.rating}}
      </li>
    </ul>

    <loading v-else />

  </div>
</template>

<script>
import Loading from '../components/Loading.vue'

export default {
  components: {
    Loading,
  },

  props: ['maybeComments'],

  computed: {
    ready() {
      return this.maybeComments.matchWith({
        Just: () => true,
        Nothing: () => false
      })
    },
    comments() {
      return this.maybeComments.getOrElse([])
    }
  }
}
</script>
