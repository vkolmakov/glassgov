import { axios, compose } from './utils'

const BASE = `${window.location.origin}/api`
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

function joinUrl(...parts) {
  return [...parts].join('/')
}

function updatePhotoIfMissing(employee) {
  return {
    ...employee,
    photo: employee.photo || 'http://imgh.us/person-photo-placeholder.svg',
  }
}

export function getEmployees() {
  return axios.get(joinUrl(BASE, extensions.employees))
    .then(res => res.data.map(compose(renameMongoId, updatePhotoIfMissing)),
          () => [])
}

export function getRatings(id) {
  return axios.get(joinUrl(BASE, extensions.ratings, id))
    .then(res => res.data.map(renameMongoId),
          () => [])
}

export function getFeatured() {
  return axios.get(joinUrl(BASE, extensions.featured))
    .then(res => res.data.map(compose(renameMongoId, updatePhotoIfMissing)),
          () => [])
}

export function submitRating({ value, comment, employee }) {
  return axios.post(joinUrl(BASE, extensions.ratings, employee.id), {
    value,
    text: comment,
  })
}

export function signIn({ email, password }) {
  return axios.post(joinUrl(BASE, extensions.signin), { email, password })
    .then(res => res.data.token)
}

export function signUp({ email, password }) {
  return axios.post(joinUrl(BASE, extensions.signup), { email, password })
    .then(res => res.data.token)
}

export function getRatingStatusForUser(id) {
  return axios.get(joinUrl(BASE, extensions.ratingStatus, id))
    .then(res => res.data)
}
