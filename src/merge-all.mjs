import { iterableCurry } from './internal/iterable'
import zipEntriesLongest from './internal/zip-entries-longest'
import mergeFactory from './internal/merge-factory'

const mergeAll = mergeFactory(zipEntriesLongest)

export default iterableCurry(mergeAll, true)
