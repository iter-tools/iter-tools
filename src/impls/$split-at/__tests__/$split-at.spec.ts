import assert from 'static-type-assert';

import { ResultIterable as SyncResultIterable } from '../../../types/iterable';
import { $Iterable, $ResultIterable } from '../../../types/$iterable';
import { $splitAt } from 'iter-tools-es';

declare const Ø: never;

assert<SyncResultIterable<$ResultIterable<number>>>($splitAt(3, Ø as $Iterable<number>));

assert<SyncResultIterable<$ResultIterable<number>>>($splitAt(3)(Ø as $Iterable<number>));
