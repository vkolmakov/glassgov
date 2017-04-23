<template>

  <div class="search-group">
    <input type="search"
           class="search-bar"
           placeholder="Start typing to search here"
           v-model="query"
           @search="onSearchEventCleanUp"
           @focus="onFocus" />
  </div>

</template>

<script>
import { mapActions, mapState } from 'vuex'
import Rx from 'rxjs/Rx'
import { prop } from '../utils'

export default {
  created() {
    this.query = this.initialQuery
  },

  data() {
    return {
      query: ''
    }
  },

  computed: {
    ...mapState({
      initialQuery: state => state.ui.search.query,
    })
  },

  subscriptions() {
    const { search } = this

    const query$ = this.$fromDOMEvent('input.search-bar', 'keyup')
                       .pluck('target', 'value')
                       .distinctUntilChanged()
                       .debounceTime(300)

    return {
      query$: query$.switchMap(search)
    }
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
    onFocus() {
      this.openSearch()
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
