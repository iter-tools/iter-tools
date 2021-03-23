import assert from 'static-type-assert';

import { $IterableIterator } from '../../../types/$iterable';
import { $zipAll } from 'iter-tools-es';

declare const Ø: never;

// zipAll()
assert<$IterableIterator<[number | undefined, string | undefined]>>(
  $zipAll(Ø as [0, 1, 2], Ø as ['a', 'b', 'c']),
);
assert<$IterableIterator<[number | undefined, string | undefined, boolean | undefined]>>(
  $zipAll(Ø as [0, 1, 2], Ø as ['a', 'b', 'c'], Ø as [true, false, true]),
);

// zipAll({ filler })
assert<$IterableIterator<[number | Date, string | Date]>>(
  $zipAll({ filler: new Date() }, Ø as [0, 1, 2], Ø as ['a', 'b', 'c']),
);
assert<$IterableIterator<[number | Date, string | Date, boolean | Date]>>(
  $zipAll({ filler: new Date() }, Ø as [0, 1, 2], Ø as ['a', 'b', 'c'], Ø as [true, false, true]),
);
