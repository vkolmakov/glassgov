import Vue from 'vue'
import Vuex from 'vuex'

import * as api from './api'

Vue.use(Vuex)

const mutationTypes = {
  LOAD_EMPLOYEES: 'LOAD_EMPLOYEES',
  CLEAR_EMPLOYEES: 'CLEAR_EMPLOYEES',
  SELECT_EMPLOYEES: 'SELECT_EMPLOYEES',
  LOAD_FEATURED: 'LOAD_FEATURED',
  CLEAR_FEATURED: 'CLEAR_FEATURED',
  SET_AUTHENTICATION: 'SET_AUTHENTICATION',
  CLEAR_AUTHENTICATION: 'CLEAR_AUTHENTICATION',
  UI_OPEN_SEARCH: 'UI_OPEN_SEARCH',
  UI_CLOSE_SEARCH: 'UI_CLOSE_SEARCH',
}

const store = new Vuex.Store({
  state: {
    employees: {
      all: [],
      selected: [],
    },

    featured: [],

    auth: {
      isAuthenticated: false,
    },

    ui: {
      search: {
        isSearching: false,
        query: '',
      },
    },
  },

  mutations: {
    [mutationTypes.LOAD_EMPLOYEES](state, employees) {
      state.employees.all = employees
    },
    [mutationTypes.CLEAR_EMPLOYEES](state) {
      state.employees.all = []
    },
    [mutationTypes.SELECT_EMPLOYEES](state, query) {
      state.employees.selected = state.employees.all.filter(e => e.name.toLowerCase().includes(query))
    },

    [mutationTypes.LOAD_FEATURED](state, featured) {
      state.featured = featured
    },
    [mutationTypes.CLEAR_FEATURED](state) {
      state.featured = []
    },

    [mutationTypes.SET_AUTHENTICATION](state) {
      state.auth.isAuthenticated = true
    },
    [mutationTypes.CLEAR_AUTHENTICATION](state) {
      state.auth.isAuthenticated = false
    },

    [mutationTypes.UI_OPEN_SEARCH](state) {
      state.ui.search.isSearching = true
    },
    [mutationTypes.UI_CLOSE_SEARCH](state) {
      state.ui.search.isSearching = false
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
    openSearch({ commit }) {
      commit(mutationTypes.UI_OPEN_SEARCH)
    },
    closeSearch({ commit }) {
      commit(mutationTypes.UI_CLOSE_SEARCH)
    },

  },
})

export default store
