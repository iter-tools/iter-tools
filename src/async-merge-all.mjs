import { asyncIterableCurry } from './internal/async-iterable'
import asyncZipEntriesLongest from './internal/async-zip-entries-longest'
import asyncMergeFactory from './internal/async-merge-factory'

const asyncMergeAll = asyncMergeFactory(asyncZipEntriesLongest)

export default asyncIterableCurry(asyncMergeAll, true)
