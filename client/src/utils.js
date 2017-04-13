import * as FolktaleMaybe from 'folktale/data/maybe'
import R from 'ramda'
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

export const trace = msg => R.tap(x => console.log(msg, x))
export const redirectTo = name => router.push({ name })
