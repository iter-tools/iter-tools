import slice from './async-slice'
import asyncToArray from './async-to-array'

export default async function asyncFirst (iterable) {
  const arr = await asyncToArray(slice(1, iterable))
  return arr[0]
}
