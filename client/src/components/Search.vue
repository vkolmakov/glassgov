<template>
  <div>
    <input type="text"
           v-model="query"
           @keyup="onInput"
           @focus="onFocus"
           @blur="onBlur" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data() {
    return {
      query: '',
    }
  },

  methods: {
    onInput(e) {
      const query = this.query
      this.selectEmployees(query)
    },
    onFocus() {
      this.openSearch()
    },
    onBlur() {
      if (!this.query) {
        this.closeSearch()
      }
    },
    ...mapActions({
      selectEmployees: 'selectEmployees',
      openSearch: 'openSearch',
      closeSearch: 'closeSearch',
    }),
  },
}
</script>
