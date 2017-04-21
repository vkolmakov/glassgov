import Vue from 'vue'

import store from './store'
import router from './router'
import App from './App.vue'
import { getAuthTokenFromStorage, setAuthToken } from './auth/actions'


getAuthTokenFromStorage()
  .map(JSON.parse)
  .map(setAuthToken)
  .matchWith({
    Just: () => store.dispatch('setAuthentication'),
    Nothing: () => {},
  })

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
