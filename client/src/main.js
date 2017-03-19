import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import App from './App.vue'
import Home from './home/Home.vue'
import EmployeeDetail from './employee/EmployeeDetail.vue'
import SignIn from './auth/SignIn.vue'
import SignUp from './auth/SignUp.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/employee/:id', component: EmployeeDetail },
    { path: '/signin', component: SignIn },
    { path: '/signup', component: SignUp },
  ],
  mode: 'history',
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
