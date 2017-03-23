<template>
  <link-wrapper :to="{ name: 'employee', params: { id: employee.id } }">
    <div class="employee">
      <div class="left">
        <img :alt="photoAlt" :src="employee.photo"/>
      </div>

      <div class="right">
        <h1>{{ employee.name }}</h1>
        <h2>{{ employee.title }}, {{ employee.salary }}</h2>
        <star-rating :rating="employee.rating" />
      </div>
  </div>
        </link-wrapper>
</template>

<script>
import LinkWrapper from './LinkWrapper.vue'
import StarRating from './StarRating.vue'

export default {
  props: ['employee'],

  components: {
    LinkWrapper,
    StarRating,
  },

  computed: {
    photoAlt() {
      const kebabCasedName = this.employee.name
                                 .split(/\s+/)
                                 .map(n => n.toLowerCase())
                                 .join('-')

      return `${kebabCasedName}-photo`
    },
  },
}
</script>

<style scoped>
.employee {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  height: 175px;
  margin: 1.5em 0;
}

.employee > .left {
  flex: 1;
  max-height: 140px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
}

.employee > .left > img {
  max-width: 140px;
  object-fit: cover;
  border-radius: 100%;
  border: 1px solid var(--tertiary-color);
}

.employee > .right {
  flex: 2;
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

.employee > .right > h1 {
  font-size: 1.8rem;
  margin: 0;
}

.employee > .right > h2 {
  font-size: 1.2em;
  margin: 0
}

</style>
