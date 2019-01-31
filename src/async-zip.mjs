import asyncMerge from './async-merge'

export default function asyncZip (...iterables) {
  return asyncMerge((...items) => [...items], ...iterables)
}
