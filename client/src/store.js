import Vue from 'vue'
import Vuex from 'vuex'

import { Maybe, identity, filter, find, redirectTo, sort, prop, ascend, descend, compose, map } from './utils'
import { routeNames } from './router'
import { setAuthToken, clearAuthToken } from './auth/actions'
import * as api from './api'

import { SORT_TYPES } from './constants'

Vue.use(Vuex)

const mutationTypes = {
  LOAD_EMPLOYEES: 'LOAD_EMPLOYEES',
  CLEAR_EMPLOYEES: 'CLEAR_EMPLOYEES',
  SELECT_EMPLOYEES: 'SELECT_EMPLOYEES',
  CLEAR_EMPLOYEE_SELECTION: 'CLEAR_EMPLOYEE_SELECTION',
  LOAD_FEATURED: 'LOAD_FEATURED',
  CLEAR_FEATURED: 'CLEAR_FEATURED',

  UI_SET_SEARCH_QUERY: 'UI_SET_SEARCH_QUERY',
  UI_CLEAR_SEARCH_QUERY: 'UI_CLEAR_SEARCH_QUERY',
  UI_SEARCH_SORT_SALARY_ASC: 'UI_SEARCH_SORT_SALARY_ASC',
  UI_SEARCH_SORT_SALARY_DESC: 'UI_SEARCH_SORT_SALARY_DESC',
  UI_SEARCH_SORT_CLEAR: 'UI_SEARCH_SORT_CLEAR',

  AUTH_SET_AUTHENTICATION: 'AUTH_SET_AUTHENTICATION',
  AUTH_CLEAR_AUTHENTICATION: 'AUTH_CLEAR_AUTHENTICATION',
}

const store = new Vuex.Store({
  state: {
    employees: {
      all: Maybe.Nothing(),
      selected: Maybe.Nothing(),
    },

    featured: Maybe.Nothing(),

    auth: {
      authenticated: false,
    },

    ui: {
      search: {
        query: '',
        sort: {
          salary: Maybe.Nothing(),
        },
      },
    },
  },

  mutations: {
    [mutationTypes.LOAD_EMPLOYEES](state, employees) {
      state.employees.all = Maybe.Just(employees)
      state.employees.selected = Maybe.Just(employees)
    },
    [mutationTypes.CLEAR_EMPLOYEES](state) {
      state.employees.all = Maybe.Just([])
    },
    [mutationTypes.SELECT_EMPLOYEES](state, query) {
      const isMatchingQuery = e => e.name.toLowerCase().includes(query.toLowerCase())
      state.employees.selected = state.employees.all.map(filter(isMatchingQuery))
    },
    [mutationTypes.CLEAR_EMPLOYEE_SELECTION](state) {
      state.employees.selected = state.employees.all.map(identity)
    },

    [mutationTypes.LOAD_FEATURED](state, featured) {
      state.featured = Maybe.Just(featured)
    },
    [mutationTypes.CLEAR_FEATURED](state) {
      state.featured = Maybe.Just([])
    },

    [mutationTypes.AUTH_SET_AUTHENTICATION](state) {
      state.auth.authenticated = true
    },
    [mutationTypes.AUTH_CLEAR_AUTHENTICATION](state) {
      state.auth.authenticated = false
    },

    [mutationTypes.UI_SET_SEARCH_QUERY](state, query) {
      state.ui.search.query = query
    },
    [mutationTypes.UI_CLEAR_SEARCH_QUERY](state) {
      state.ui.search.query = ''
    },

    [mutationTypes.UI_SEARCH_SORT_CLEAR](state) {
      state.ui.search.sort.salary = Maybe.Nothing()
      state.employees.selected = state.employees.all.map(identity)
    },

    [mutationTypes.UI_SEARCH_SORT_SALARY_ASC](state) {
      state.ui.search.sort.salary = Maybe.Just(SORT_TYPES.ASC)
      const ascendBySalary = ascend(prop('salary'))
      state.employees.selected = state.employees.selected.map(sort(ascendBySalary))
    },

    [mutationTypes.UI_SEARCH_SORT_SALARY_DESC](state) {
      state.ui.search.sort.salary = Maybe.Just(SORT_TYPES.DESC)
      const descendBySalary = descend(prop('salary'))
      state.employees.selected = state.employees.selected.map(sort(descendBySalary))

    },

  },

  actions: {
    loadEmployees({ commit }) {
      api.getEmployees()
        .then(employees => commit(mutationTypes.LOAD_EMPLOYEES, employees))
    },
    selectEmployees({ commit }, query) {
      commit(mutationTypes.SELECT_EMPLOYEES, query)
    },
    clearEmployeeSelection({ commit }) {
      commit(mutationTypes.CLEAR_EMPLOYEE_SELECTION)
    },

    openSearch(_) {
      redirectTo(routeNames.search)
    },

    setSearchQuery({ commit }, query) {
      commit(mutationTypes.UI_SET_SEARCH_QUERY, query)
    },

    search({ dispatch }, query) {
      dispatch('setSearchQuery', query)
        .then(() => dispatch('selectEmployees', query))
    },
    clearSearch({ dispatch }) {
      dispatch('setSearchQuery', '')
        .then(() => dispatch('clearEmployeeSelection'))
    },

    clearSort({ commit }) {
      commit(mutationTypes.UI_SEARCH_SORT_CLEAR)
    },

    sortBySalaryAsc({ commit, dispatch }) {
      commit(mutationTypes.UI_SEARCH_SORT_SALARY_ASC)
    },

    sortBySalaryDesc({ commit }) {
      commit(mutationTypes.UI_SEARCH_SORT_SALARY_DESC)
    },

    loadFeatured({ commit }) {
      api.getFeatured()
        .then(featured => commit(mutationTypes.LOAD_FEATURED, featured))
    },

    setAuthentication({ commit }) {
      commit(mutationTypes.AUTH_SET_AUTHENTICATION)
    },

    clearAuthentication({ commit }) {
      commit(mutationTypes.AUTH_CLEAR_AUTHENTICATION)
    },

    signUp({ dispatch }, { email, password }) {
      return api.signUp({ email, password }).then(
        () => dispatch('signIn', { email, password }),
      )
    },

    signIn({ dispatch }, { email, password }) {
      const onSuccess = (token) => {
        setAuthToken(token)
        dispatch('setAuthentication')
        redirectTo('home')
      }

      return api.signIn({ email, password })
        .then(onSuccess)
    },

    signOut({ dispatch }) {
      return clearAuthToken()
        .then(() => dispatch('clearAuthentication'))
    },
  },

  getters: {
    getEmployeeById: state => (id) => {
      const findById = find(e => e.id === id)
      return state.employees.all.map(findById)
    },
  },
})

export default store
