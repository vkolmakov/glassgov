import { axios, compose } from './utils'

const BASE = window.location.origin
const extensions = {
  employees: 'employees',
  featured: 'featured',
  ratings: 'ratings',
  signin: 'signin',
  signup: 'signup',
  ratingStatus: 'rating-status',
}

function renameMongoId(obj) {
  return { ...obj, id: obj._id }
}

export function getEmployees() {
  const updatePhotoIfMissing = e =>
        ({ ...e, photo: e.photo || 'http://imgh.us/person-photo-placeholder.svg' })

  return axios.get([BASE, extensions.employees].join('/'))
    .then(res => res.data.map(compose(renameMongoId, updatePhotoIfMissing)),
          err => err)
}

export function getRatings(id) {
  return axios.get([BASE, extensions.ratings, id].join('/'))
    .then(res => res.data.map(renameMongoId),
          err => err)
}

export function getFeatured() {
  return axios.get([BASE, extensions.featured].join('/'))
    .then(res => res.data.map(renameMongoId),
          err => err)
}

export function submitRating({ value, comment, employee }) {
  return axios.post([BASE, extensions.ratings, employee.id].join('/'), {
    value,
    text: comment,
  })
}

export function signIn({ email, password }) {
  return axios.post([BASE, extensions.signin].join('/'), { email, password })
    .then(res => res.data.token,
          err => err)
}

export function signUp({ email, password }) {
  return axios.post([BASE, extensions.signup].join('/'), { email, password })
    .then(res => res.data.token,
          err => err)
}

export function getRatingStatusForUser(id) {
  return axios.get([BASE, extensions.ratingStatus, id].join('/'))
    .then(res => res.data,
          err => err)
}
