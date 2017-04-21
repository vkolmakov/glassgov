import { axios, Maybe } from '../utils'

const TOKEN_ITEM_KEY = 'token'

export function setAuthToken(token) {
  return new Promise((resolve) => {
    localStorage.setItem(TOKEN_ITEM_KEY, JSON.stringify(token))
    axios.defaults.headers.common['Authorization'] = token
    resolve(token)
  })
}

export function clearAuthToken() {
  return new Promise((resolve) => {
    localStorage.removeItem(TOKEN_ITEM_KEY)
    axios.defaults.headers.common['Authorization'] = null

    resolve()
  })
}

export function getAuthTokenFromStorage() {
  return Maybe.fromNullable(localStorage.getItem(TOKEN_ITEM_KEY))
}
