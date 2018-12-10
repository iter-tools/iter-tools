import assert from 'static-type-assert'
import * as iter from '../index'

/* flat */

// flat(iterable)
assert<{
  'depth = 0': IterableIterator<0 | 1 | 2>
  'depth = 1': IterableIterator<0 | 1 | 2 | 3>
  'depth = 2': IterableIterator<0 | 1 | [2]>
}>({
  'depth = 0': iter.flat([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat([0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(0, iterable)
assert<{
  'depth = 0': IterableIterator<0 | 1 | 2>
  'depth = 1': IterableIterator<0 | [1] | [2, 3]>
  'depth = 2': IterableIterator<0 | [1] | [[2]]>
}>({
  'depth = 0': iter.flat(0, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(0, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(0, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(1, iterable)
assert<{
  'depth = 0': IterableIterator<0 | 1 | 2>
  'depth = 1': IterableIterator<0 | 1 | 2 | 3>
  'depth = 2': IterableIterator<0 | 1 | [2]>
}>({
  'depth = 0': iter.flat(1, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(1, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(1, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(2, iterable)
assert<{
  'depth = 0': IterableIterator<0 | 1 | 2>
  'depth = 1': IterableIterator<0 | 1 | 2 | 3>
  'depth = 2': IterableIterator<0 | 1 | 2>
}>({
  'depth = 0': iter.flat(10, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(10, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(10, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(n, iterable)
assert<{
  'depth = 0': IterableIterator<any>
  'depth = 1': IterableIterator<any>
  'depth = 2': IterableIterator<any>
}>({
  'depth = 0': iter.flat(1000, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(1000, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(1000, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(0)(iterable)
assert<{
  'depth = 0': IterableIterator<0 | 1 | 2>
  'depth = 1': IterableIterator<0 | [1] | [2, 3]>
  'depth = 2': IterableIterator<0 | [1] | [[2]]>
}>({
  'depth = 0': iter.flat(0)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(0)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(0)([0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(1)(iterable)
assert<{
  'depth = 0': IterableIterator<0 | 1 | 2>
  'depth = 1': IterableIterator<0 | 1 | 2 | 3>
  'depth = 2': IterableIterator<0 | 1 | [2]>
}>({
  'depth = 0': iter.flat(1)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(1)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(1)([0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(10)(iterable)
assert<{
  'depth = 0': IterableIterator<0 | 1 | 2>
  'depth = 1': IterableIterator<0 | 1 | 2 | 3>
  'depth = 2': IterableIterator<0 | 1 | 2>
}>({
  'depth = 0': iter.flat(10)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(10)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(10)([0, [1], [[2]]] as [0, [1], [[2]]])
})

// flat(n)(iterable)
assert<{
  'depth = 0': IterableIterator<any>
  'depth = 1': IterableIterator<any>
  'depth = 2': IterableIterator<any>
}>({
  'depth = 0': iter.flat(1000)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.flat(1000)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.flat(1000)([0, [1], [[2]]] as [0, [1], [[2]]])
})

/* asyncFlat */

// asyncFlat(iterable)
assert<{
  'depth = 0': AsyncIterableIterator<0 | 1 | 2>
  'depth = 1': AsyncIterableIterator<0 | 1 | 2 | 3>
  'depth = 2': AsyncIterableIterator<0 | 1 | [2]>
}>({
  'depth = 0': iter.asyncFlat([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat([0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(0, iterable)
assert<{
  'depth = 0': AsyncIterableIterator<0 | 1 | 2>
  'depth = 1': AsyncIterableIterator<0 | [1] | [2, 3]>
  'depth = 2': AsyncIterableIterator<0 | [1] | [[2]]>
}>({
  'depth = 0': iter.asyncFlat(0, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(0, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(0, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(1, iterable)
assert<{
  'depth = 0': AsyncIterableIterator<0 | 1 | 2>
  'depth = 1': AsyncIterableIterator<0 | 1 | 2 | 3>
  'depth = 2': AsyncIterableIterator<0 | 1 | [2]>
}>({
  'depth = 0': iter.asyncFlat(1, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(1, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(1, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(2, iterable)
assert<{
  'depth = 0': AsyncIterableIterator<0 | 1 | 2>
  'depth = 1': AsyncIterableIterator<0 | 1 | 2 | 3>
  'depth = 2': AsyncIterableIterator<0 | 1 | 2>
}>({
  'depth = 0': iter.asyncFlat(10, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(10, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(10, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(n, iterable)
assert<{
  'depth = 0': AsyncIterableIterator<any>
  'depth = 1': AsyncIterableIterator<any>
  'depth = 2': AsyncIterableIterator<any>
}>({
  'depth = 0': iter.asyncFlat(1000, [0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(1000, [0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(1000, [0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(0)(iterable)
assert<{
  'depth = 0': AsyncIterableIterator<0 | 1 | 2>
  'depth = 1': AsyncIterableIterator<0 | [1] | [2, 3]>
  'depth = 2': AsyncIterableIterator<0 | [1] | [[2]]>
}>({
  'depth = 0': iter.asyncFlat(0)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(0)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(0)([0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(1)(iterable)
assert<{
  'depth = 0': AsyncIterableIterator<0 | 1 | 2>
  'depth = 1': AsyncIterableIterator<0 | 1 | 2 | 3>
  'depth = 2': AsyncIterableIterator<0 | 1 | [2]>
}>({
  'depth = 0': iter.asyncFlat(1)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(1)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(1)([0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(10)(iterable)
assert<{
  'depth = 0': AsyncIterableIterator<0 | 1 | 2>
  'depth = 1': AsyncIterableIterator<0 | 1 | 2 | 3>
  'depth = 2': AsyncIterableIterator<0 | 1 | 2>
}>({
  'depth = 0': iter.asyncFlat(10)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(10)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(10)([0, [1], [[2]]] as [0, [1], [[2]]])
})

// asyncFlat(n)(iterable)
assert<{
  'depth = 0': AsyncIterableIterator<any>
  'depth = 1': AsyncIterableIterator<any>
  'depth = 2': AsyncIterableIterator<any>
}>({
  'depth = 0': iter.asyncFlat(1000)([0, 1, 2] as [0, 1, 2]),
  'depth = 1': iter.asyncFlat(1000)([0, [1], [2, 3]] as [0, [1], [2, 3]]),
  'depth = 2': iter.asyncFlat(1000)([0, [1], [[2]]] as [0, [1], [[2]]])
})
