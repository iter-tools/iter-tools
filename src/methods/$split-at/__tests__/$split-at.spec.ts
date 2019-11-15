import assert from 'static-type-assert';

import { $Iterable, $ResultSubseqIterable } from '../../../types/$iterable';
import { $splitAt } from '../../..';

declare const Ø: never;

assert<Array<$ResultSubseqIterable<number>>>($splitAt(3, Ø as $Iterable<number>));

assert<Array<$ResultSubseqIterable<number>>>($splitAt(3)(Ø as $Iterable<number>));
