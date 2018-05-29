import asyncIter from './async-iter'

export default async function * chain (...args) {
  for (let i = 0; i < args.length; i++) {
    yield * asyncIter(args[i])
  }
}
