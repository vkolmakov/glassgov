<template>

  <nav>

    <ul>
      <li><logo /></li>
      <li v-if="!authenticated"><link-wrapper :to="{ name: 'signin' }">Sign In</link-wrapper></li>
      <li v-if="!authenticated"><link-wrapper :to="{ name: 'signup' }">Sign Up</link-wrapper></li>
      <li v-if="authenticated"><link-wrapper :to="{ name: 'signout' }">Sign Out</link-wrapper></li>
    </ul>

    <search />
  </nav>

</template>

<script>
import { mapState } from 'vuex'

import Logo from './Logo.vue'
import LinkWrapper from './LinkWrapper.vue'
import Search from '../search/Search.vue'

export default {
  components: {
    Logo,
    LinkWrapper,
    Search,
  },

  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
    })
  }

}
</script>

<style>
nav {
  background: var(--primary-color);
  text-align: center;
  padding: 0 1em;
}

nav > ul {
  max-width: 50em;
  margin: 0 auto;
  padding: 0;

  list-style-type: none;

  display: flex;
  align-items: center;
  justify-content: flex-end;

}

nav > ul > li {
  padding: 0.5em 0 0.5em 0.5em;
}

nav > ul > li:nth-child(1) {
  margin-right: auto;
  padding: 0.5em 0;
}

nav > ul > li > a {
  color: var(--secondary-color);
  cursor: pointer;
  border: 1px solid white;
  border-radius: 10px;
  padding: 0.40em;
}

nav > ul > li > a:hover {
  color: var(--primary-color);
  background-color: var(--secondary-color);
}
</style>
