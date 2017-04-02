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
import LinkWrapper from '../components/LinkWrapper.vue'
import StarRating from '../components/StarRating.vue'

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
  max-height: 110px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
}

.employee > .left > img {
  max-width: 110px;
  object-fit: cover;
  border-radius: 100%;
  border: 1px solid var(--tertiary-color);
}

.employee > .right {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
}

.employee > .right > h1 {
  font-size: 1.6rem;
  margin: 0;
}

.employee > .right > h2 {
  font-size: 1.1rem;
  margin: 0
}
</style>
