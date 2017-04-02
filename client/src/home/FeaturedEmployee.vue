<template>
  <link-wrapper class="employee-link" :to="{ name: 'employee', params: { id: employee.id } }">
    <div class="employee">
      <div class="top">
        <img :alt="photoAlt" :src="employee.photo"/>
      </div>

      <div class="bottom">
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
.employee-link {
  flex: 0 0 15em;
}

.employee {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
}

.employee > .top {
  max-height: 140px;
  display: flex;
  justify-content: center;
}

.employee > .top > img {
  max-width: 140px;
  object-fit: cover;
  border-radius: 100%;
  border: 1px solid var(--tertiary-color);
}

.employee > .bottom {
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  text-align: center;
}

.employee > .bottom > h1 {
  font-size: 1.8rem;
  margin: 0;
}

.employee > .bottom > h2 {
  font-size: 1.2em;
  margin: 0
}

</style>
