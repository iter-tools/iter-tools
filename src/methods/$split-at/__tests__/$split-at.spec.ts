import assert from 'static-type-assert';

import { ResultIterable as SyncResultIterable } from '../../../internal/iterable';
import { $Iterable, $ResultIterable } from '../../../internal/$iterable';
import { $splitAt } from '../../..';

declare const Ø: never;

assert<SyncResultIterable<$ResultIterable<number>>>($splitAt(3, Ø as $Iterable<number>));

assert<SyncResultIterable<$ResultIterable<number>>>($splitAt(3)(Ø as $Iterable<number>));
