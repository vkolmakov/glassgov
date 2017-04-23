import * as FolktaleMaybe from 'folktale/data/maybe'
import R from 'ramda'
import Fuse from 'fuse.js'
import _axios from 'axios'
import router from './router'


export const Maybe = FolktaleMaybe
export const compose = R.compose
export const identity = R.identity
export const filter = R.filter
export const find = R.find
export const map = R.map
export const dropLast = R.dropLast
export const path = R.path
export const zipObj = R.zipObj
export const prop = R.prop
export const zip = R.zip
export const sort = R.sort
export const ascend = R.ascend
export const descend = R.descend
export const take = R.take
export const slice = R.slice

export const trace = msg => R.tap(x => console.log(msg, x))
export const redirectTo = name => router.push({ name })

export const axios = _axios

export const createSearchEngine = (list) => {
  const options = {
    shouldSort: false,
    threshold: 0.5,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: [
      'name',
      'title',
      'department',
    ],
  }

  return new Fuse(list, options)
}
