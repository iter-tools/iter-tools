import merge from './merge'

export default function zip (...iterables) {
  return merge((...items) => [...items], ...iterables)
}
