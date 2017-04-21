<template>
  <select @change="onSelect" :value="value">
    <option disabled value="">Sort by {{ propertyName }}</option>
    <option :value="SORT_TYPES.DESC">Highest First</option>
    <option :value="SORT_TYPES.ASC">Lowest First</option>
  </select>
</template>

<script>
import { SORT_TYPES } from '../constants'
import { Maybe } from '../utils'

export default {
  props: {
    value: { type: Maybe },
    propertyName: { type: String },
    onClear: { type: Function },
    onAscend: { type: Function },
    onDescend: { type: Function },
  },

  data() {
    return {
      SORT_TYPES,
    }
  },

  methods: {
    onSelect(e) {
      const direction = e.target.value

      switch (direction) {
        case SORT_TYPES.ASC:
          this.onAscend()
          break
        case SORT_TYPES.DESC:
          this.onDescend()
          break
        default:
          this.onClear()
          break
      }
    }
  }

}
</script>

<style>
select {
  height: 2.5em;
  color: black;
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
