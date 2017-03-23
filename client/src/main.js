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
    { path: '/', component: Home, name: 'home' },
    { path: '/employee/:id', component: EmployeeDetail, name: 'employee' },
    { path: '/signin', component: SignIn, name: 'signin' },
    { path: '/signup', component: SignUp, name: 'signup' },
  ],
  mode: 'history',
})

router.afterEach((to, from) => {
  store.dispatch('closeSearch')
})

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App),
})
