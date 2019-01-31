import asyncMergeAll from './async-merge-all'

export default function zip (...iterables) {
  return asyncMergeAll((...items) => [...items], ...iterables)
}
