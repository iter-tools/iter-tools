/**
 * @generated-from ./$flat.spec.ts
 * This file is autogenerated from a template. Please do not edit it directly.
 * To rebuild it from its template use the command
 * > npm run generate
 * More information can be found in CONTRIBUTING.md
 */

import assert from 'static-type-assert';
import { AsyncIterable, AsyncResultIterable } from '../../../types/async-iterable';
import { asyncFlat } from '../../..';
declare const Ø: never; // asyncFlat(iterable)

assert<{
  'depth = 0': AsyncResultIterable<0 | 1 | 2>;
  'depth = 1': AsyncResultIterable<0 | 1 | 2 | 3>;
  'depth = 2': AsyncResultIterable<0 | 1 | [2]>;
}>({
  'depth = 0': asyncFlat(Ø as [0, 1, 2]),
  'depth = 1': asyncFlat(Ø as [0, [1], [2, 3]]),
  'depth = 2': asyncFlat(Ø as [0, [1], [[2]]]),
}); // asyncFlat(0, iterable)

assert<{
  'depth = 0': AsyncResultIterable<0 | 1 | 2>;
  'depth = 1': AsyncResultIterable<0 | [1] | [2, 3]>;
  'depth = 2': AsyncResultIterable<0 | [1] | [[2]]>;
}>({
  'depth = 0': asyncFlat(0, Ø as [0, 1, 2]),
  'depth = 1': asyncFlat(0, Ø as [0, [1], [2, 3]]),
  'depth = 2': asyncFlat(0, Ø as [0, [1], [[2]]]),
}); // asyncFlat(1, iterable)

assert<{
  'depth = 0': AsyncResultIterable<0 | 1 | 2>;
  'depth = 1': AsyncResultIterable<0 | 1 | 2 | 3>;
  'depth = 2': AsyncResultIterable<0 | 1 | [2]>;
}>({
  'depth = 0': asyncFlat(1, Ø as [0, 1, 2]),
  'depth = 1': asyncFlat(1, Ø as [0, [1], [2, 3]]),
  'depth = 2': asyncFlat(1, Ø as [0, [1], [[2]]]),
}); // asyncFlat(n, iterable)

assert<{
  'depth = 0': AsyncResultIterable<any>;
  'depth = 1': AsyncResultIterable<any>;
  'depth = 2': AsyncResultIterable<any>;
}>({
  'depth = 0': asyncFlat(Ø as number, Ø as [0, 1, 2]),
  'depth = 1': asyncFlat(Ø as number, Ø as [0, [1], [2, 3]]),
  'depth = 2': asyncFlat(Ø as number, Ø as [0, [1], [[2]]]),
}); // asyncFlat(0)(iterable)

assert<{
  'depth = 0': AsyncResultIterable<0 | 1 | 2>;
  'depth = 1': AsyncResultIterable<0 | [1] | [2, 3]>;
  'depth = 2': AsyncResultIterable<0 | [1] | [[2]]>;
}>({
  'depth = 0': asyncFlat(0)(Ø as [0, 1, 2]),
  'depth = 1': asyncFlat(0)(Ø as [0, [1], [2, 3]]),
  'depth = 2': asyncFlat(0)(Ø as [0, [1], [[2]]]),
}); // asyncFlat(1)(iterable)

assert<{
  'depth = 0': AsyncResultIterable<0 | 1 | 2>;
  'depth = 1': AsyncResultIterable<0 | 1 | 2 | 3>;
  'depth = 2': AsyncResultIterable<0 | 1 | [2]>;
}>({
  'depth = 0': asyncFlat(1)(Ø as [0, 1, 2]),
  'depth = 1': asyncFlat(1)(Ø as [0, [1], [2, 3]]),
  'depth = 2': asyncFlat(1)(Ø as [0, [1], [[2]]]),
}); // asyncFlat(n)(iterable)

assert<{
  'depth = 0': AsyncResultIterable<any>;
  'depth = 1': AsyncResultIterable<any>;
  'depth = 2': AsyncResultIterable<any>;
}>({
  'depth = 0': asyncFlat((Ø as number))((Ø as [0, 1, 2])),
  'depth = 1': asyncFlat((Ø as number))((Ø as [0, [1], [2, 3]])),
  'depth = 2': asyncFlat((Ø as number))((Ø as [0, [1], [[2]]]))
}); // prettier-ignore

assert<AsyncResultIterable<number>>(asyncFlat(0, (Ø as AsyncIterable<number>))); // prettier-ignore

assert<AsyncResultIterable<number>>(asyncFlat(1, (Ø as AsyncIterable<AsyncIterable<number>>))); // prettier-ignore

assert<AsyncResultIterable<number>>(asyncFlat(2, (Ø as AsyncIterable<AsyncIterable<AsyncIterable<number>>>))); // prettier-ignore

assert<AsyncResultIterable<number>>(asyncFlat(3, (Ø as AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<number>>>>))); // prettier-ignore

assert<AsyncResultIterable<number>>(asyncFlat(4, (Ø as AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<number>>>>>))); // prettier-ignore

assert<AsyncResultIterable<number>>(asyncFlat(5, (Ø as AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<number>>>>>>))); // prettier-ignore

assert<AsyncResultIterable<number>>(asyncFlat(6, (Ø as AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<number>>>>>>>))); // prettier-ignore

assert<AsyncResultIterable<number>>(
  asyncFlat(7, Ø as AsyncIterable<
    AsyncIterable<
      AsyncIterable<
        AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<AsyncIterable<number>>>>>
      >
    >
  >),
);
