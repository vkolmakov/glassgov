export function setAuthToken(token) {
  return new Promise((resolve) => {
    console.log('setting token to', token)
    resolve()
  })
}

export function clearAuthToken() {
  return new Promise((resolve) => {
    console.log('clearing auth token')
    resolve()
  })
}
