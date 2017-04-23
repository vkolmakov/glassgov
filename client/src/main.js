import Vue from 'vue'
import Rx from 'rxjs/Rx'
import VueRx from 'vue-rx'

import store from './store'
import router from './router'
import App from './App.vue'
import { getAuthTokenFromStorage, setAuthToken } from './auth/actions'


Vue.use(VueRx, Rx)

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
