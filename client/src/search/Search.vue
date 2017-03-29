<template>

  <div class="search-group">
    <input type="search"
           placeholder="Start typing to search here"
           v-model="query"
           @keyup="onInput"
           @search="onSearchEventCleanUp"
           @focus="onFocus" />
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      query: state => state.ui.search.query,
    })
  },

  methods: {
    onSearchEventCleanUp(e) {
      // search event is triggered by either pressing enter key
      // or clicking on the clear icon in the input[type=search]
      // this handler will make sure that clearing the input is handled properly.
      const query = e.target.value

      if (query === '') {
        this.clearSearch()
      }
    },

    onInput(e) {
      const query = e.target.value
      this.search(query)
    },
    onFocus() {
      this.openSearch()
    },
    clearSearch() {
      const { clearSearch } = this
      clearSearch()
    },
    ...mapActions({
      openSearch: 'openSearch',
      search: 'search',
      clearSearch: 'clearSearch',
    }),
  },
}
</script>

<style scoped>
.search-group {
  max-width: 50em;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.5em;
}

.search-group > input {
  height: 1.6em;
  background-color: var(--secondary-color);
  border: .1em solid var(--tertiary-color);
  border-radius: 0.4em;
  box-shadow: none;
  flex: 1;

  font-family: var(--font-family);
  font-size: 0.9rem;

  padding: 1em 1em;
}
</style>
