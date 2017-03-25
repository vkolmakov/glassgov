<template>
  <div id="app">
    <navbar />
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import Navbar from './components/Navbar.vue'
import EmployeeList from './search/EmployeeList.vue'

export default {
  components: {
    Navbar,
    EmployeeList,
  },

  created() {
    this.loadFeatured();
    this.loadEmployees()
  },

  methods: mapActions({
    loadEmployees: 'loadEmployees',
    loadFeatured: 'loadFeatured',
  })
}
</script>

<style>
:root {
  --text-color: #444;
  --text-em-color: #222;
  --primary-color: #77a3f5;
  --secondary-color: #fff;
  --tertiary-color: #f1f1f1;
  --default-font: "Open Sans", "Helvetica", "Arial", sans-serif;

  font-size: 0.85em;
}

@media (min-width: 748px) {
  :root {
    font-size: 1.2em;
  }
}

body {
  font-family: var(--default-font);
  line-height: 1.5;
  margin: 0;
  padding: 0;
  color: var(--text-color);
}

main {
  margin: 0 auto 1em auto;
  max-width: 50em;
  padding: 0.5em 1.5em;
}

h1, h2 {
  color: var(--text-em-color);
}

a {
  color: var(--primary-color);
}
</style>
