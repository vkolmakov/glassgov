import Vue from 'vue'
import VueRouter from 'vue-router'

import App from './App.vue'
import Home from './Home.vue'
import EmployeeDetail from './EmployeeDetail.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/employee/:id', component: EmployeeDetail },
  ],
  mode: 'history',
})

new Vue({
  router,
  el: '#app',
  render: h => h(App),
})
