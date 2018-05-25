import iter from '../iter'

export default async function * asyncIter (syncIterable) {
  yield * iter(syncIterable)
}
