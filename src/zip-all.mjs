import mergeAll from './merge-all'

export default function zipAll (...iterables) {
  return mergeAll((...items) => [...items], ...iterables)
}
