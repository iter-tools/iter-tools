import assert from 'static-type-assert';

import { IterableIterator as SyncIterableIterator } from '../../../types/iterable';
import { $Iterable, $IterableIterator } from '../../../types/$iterable';
import { $splitAt } from 'iter-tools-es';

declare const Ø: never;

assert<SyncIterableIterator<$IterableIterator<number>>>($splitAt(3, Ø as $Iterable<number>));

assert<SyncIterableIterator<$IterableIterator<number>>>($splitAt(3)(Ø as $Iterable<number>));
