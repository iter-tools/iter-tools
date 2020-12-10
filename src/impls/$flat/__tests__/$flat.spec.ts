import assert from 'static-type-assert';

import { $Iterable, $IterableIterator } from '../../../types/$iterable';
import { $flat } from 'iter-tools-es';

declare const Ø: never;

// asyncFlat(iterable)
assert<{
  'depth = 0': $IterableIterator<0 | 1 | 2>;
  'depth = 1': $IterableIterator<0 | 1 | 2 | 3>;
  'depth = 2': $IterableIterator<0 | 1 | [2]>;
}>({
  'depth = 0': $flat(Ø as [0, 1, 2]),
  'depth = 1': $flat(Ø as [0, [1], [2, 3]]),
  'depth = 2': $flat(Ø as [0, [1], [[2]]]),
});

// asyncFlat(0, iterable)
assert<{
  'depth = 0': $IterableIterator<0 | 1 | 2>;
  'depth = 1': $IterableIterator<0 | [1] | [2, 3]>;
  'depth = 2': $IterableIterator<0 | [1] | [[2]]>;
}>({
  'depth = 0': $flat(0, Ø as [0, 1, 2]),
  'depth = 1': $flat(0, Ø as [0, [1], [2, 3]]),
  'depth = 2': $flat(0, Ø as [0, [1], [[2]]]),
});

// asyncFlat(1, iterable)
assert<{
  'depth = 0': $IterableIterator<0 | 1 | 2>;
  'depth = 1': $IterableIterator<0 | 1 | 2 | 3>;
  'depth = 2': $IterableIterator<0 | 1 | [2]>;
}>({
  'depth = 0': $flat(1, Ø as [0, 1, 2]),
  'depth = 1': $flat(1, Ø as [0, [1], [2, 3]]),
  'depth = 2': $flat(1, Ø as [0, [1], [[2]]]),
});

// asyncFlat(n, iterable)
assert<{
  'depth = 0': $IterableIterator<any>;
  'depth = 1': $IterableIterator<any>;
  'depth = 2': $IterableIterator<any>;
}>({
  'depth = 0': $flat(Ø as number, Ø as [0, 1, 2]),
  'depth = 1': $flat(Ø as number, Ø as [0, [1], [2, 3]]),
  'depth = 2': $flat(Ø as number, Ø as [0, [1], [[2]]]),
});

// asyncFlat(0)(iterable)
assert<{
  'depth = 0': $IterableIterator<0 | 1 | 2>;
  'depth = 1': $IterableIterator<0 | [1] | [2, 3]>;
  'depth = 2': $IterableIterator<0 | [1] | [[2]]>;
}>({
  'depth = 0': $flat(0)(Ø as [0, 1, 2]),
  'depth = 1': $flat(0)(Ø as [0, [1], [2, 3]]),
  'depth = 2': $flat(0)(Ø as [0, [1], [[2]]]),
});

// asyncFlat(1)(iterable)
assert<{
  'depth = 0': $IterableIterator<0 | 1 | 2>;
  'depth = 1': $IterableIterator<0 | 1 | 2 | 3>;
  'depth = 2': $IterableIterator<0 | 1 | [2]>;
}>({
  'depth = 0': $flat(1)(Ø as [0, 1, 2]),
  'depth = 1': $flat(1)(Ø as [0, [1], [2, 3]]),
  'depth = 2': $flat(1)(Ø as [0, [1], [[2]]]),
});

// asyncFlat(n)(iterable)
assert<{
  'depth = 0': $IterableIterator<any>;
  'depth = 1': $IterableIterator<any>;
  'depth = 2': $IterableIterator<any>;
}>({
  'depth = 0': $flat(Ø as number)(Ø as [0, 1, 2]),
  'depth = 1': $flat(Ø as number)(Ø as [0, [1], [2, 3]]),
  'depth = 2': $flat(Ø as number)(Ø as [0, [1], [[2]]]),
});

// prettier-ignore
assert<$IterableIterator<number>>($flat(0, Ø as $Iterable<number>));
// prettier-ignore
assert<$IterableIterator<number>>($flat(1, Ø as $Iterable<$Iterable<number>>));
// prettier-ignore
assert<$IterableIterator<number>>($flat(2, Ø as $Iterable<$Iterable<$Iterable<number>>>));
// prettier-ignore
assert<$IterableIterator<number>>($flat(3, Ø as $Iterable<$Iterable<$Iterable<$Iterable<number>>>>));
// prettier-ignore
assert<$IterableIterator<number>>($flat(4, Ø as $Iterable<$Iterable<$Iterable<$Iterable<$Iterable<number>>>>>));
// prettier-ignore
assert<$IterableIterator<number>>($flat(5, Ø as $Iterable<$Iterable<$Iterable<$Iterable<$Iterable<$Iterable<number>>>>>>));
// prettier-ignore
assert<$IterableIterator<number>>($flat(6, Ø as $Iterable<$Iterable<$Iterable<$Iterable<$Iterable<$Iterable<$Iterable<number>>>>>>>));
// prettier-ignore
assert<$IterableIterator<number>>($flat(7, Ø as $Iterable<$Iterable<$Iterable<$Iterable<$Iterable<$Iterable<$Iterable<$Iterable<number>>>>>>>>));
