import curry from './internal/curry'
import asyncMerge, { asyncMergeByReadiness } from './async-merge'
import asyncConsume from './async-consume'

async function asyncConsumeMany (func, iterableOfIterables) {
  await asyncConsume(func, asyncMerge(asyncMergeByReadiness(), iterableOfIterables))
}

export default curry(asyncConsumeMany)
