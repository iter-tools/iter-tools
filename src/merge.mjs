import { iterableCurry } from './internal/iterable'
import zipEntriesShortest from './internal/zip-entries-shortest'
import mergeFactory from './internal/merge-factory'

const merge = mergeFactory(zipEntriesShortest)

export default iterableCurry(merge, true)
