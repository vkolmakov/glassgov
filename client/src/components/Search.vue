<template>
  <div>
    <input type="text"
           v-model="query"
           @keyup="onInput"
           @focus="onFocus" />
    <search-close-button
        :onClick="onCloseSearchClick" />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import SearchCloseButton from './SearchCloseButton.vue'

export default {
  components: {
    SearchCloseButton,
  },

  computed: {
    ...mapState({
      query: state => state.ui.search.query,
    })
  },

  methods: {
    onInput(e) {
      const query = e.target.value
      this.search(query)
    },
    onFocus() {
      this.openSearch()
    },
    onCloseSearchClick() {
      const { clearSearch, closeSearch } = this
      clearSearch()
        .then(closeSearch)
    },
    ...mapActions({
      openSearch: 'openSearch',
      closeSearch: 'closeSearch',
      search: 'search',
      clearSearch: 'clearSearch',
    }),
  },
}
</script>
