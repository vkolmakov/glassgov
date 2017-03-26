<template>
  <div class="search-group">
    <input type="text"
           v-model="query"
           @keyup="onInput"
           @focus="onFocus" />
    <search-close-button
        v-if="isSearching"
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
      isSearching: state => state.ui.search.isSearching,
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

<style scoped>
.search-group {
  display: flex;
  align-items: center;
  justify-content: center;
  witdh: 100%;
}

.search-group > input {
  width: 100%;
  height: 1.6em;
  background-color: var(--secondary-color);
  border: .1em solid var(--tertiary-color);
  border-radius: 0.4em;
  box-shadow: none;

  font-family: var(--font-family);
  font-size: 0.9rem;

  padding: 0.3em 1em;
}
</style>
