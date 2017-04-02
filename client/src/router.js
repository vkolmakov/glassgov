import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import Home from './home/Home.vue'
import EmployeeDetail from './employee/EmployeeDetail.vue'
import EmployeeList from './search/EmployeeList.vue'

import SignIn from './auth/SignIn.vue'
import SignUp from './auth/SignUp.vue'
import SignOut from './auth/SignOut.vue'


Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/employee/:id', component: EmployeeDetail, name: 'employee' },
  { path: '/search', component: EmployeeList, name: 'search' },
  { path: '/signin', component: SignIn, name: 'signin' },
  { path: '/signup', component: SignUp, name: 'signup' },
  { path: '/signout', component: SignOut, name: 'signout' },
]

export const routeNames = routes.reduce((acc, r) => ({ [r.name]: r.name, ...acc }), {})

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
