import { asyncIterableCurry } from './internal/async-iterable'
import asyncZipEntriesShortest from './internal/async-zip-entries-shortest'
import asyncMergeFactory from './internal/async-merge-factory'

const asyncMerge = asyncMergeFactory(asyncZipEntriesShortest)

export default asyncIterableCurry(asyncMerge, true)
