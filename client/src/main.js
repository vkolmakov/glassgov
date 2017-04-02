import Vue from 'vue'

import store from './store'
import router from './router'
import App from './App.vue'

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
