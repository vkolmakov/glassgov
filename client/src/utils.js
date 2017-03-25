import * as FolktaleMaybe from 'folktale/data/maybe'
import R from 'ramda'
import router from './router'

export const Maybe = FolktaleMaybe
export const compose = R.compose
export const identity = R.identity
export const filter = R.filter
export const find = R.find
export const redirectTo = name => router.push({ name })
