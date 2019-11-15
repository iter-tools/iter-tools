import { $Promise } from '../../../../generate/async.macro';

import assert from 'static-type-assert';
import { $Iterable, $ResultSubseqIterable } from '../../../types/$iterable';
import { $EntryIterable } from '../../../types/$entry-iterable';
import { $groupBy } from '../../..';

declare const Ø: never;

assert<$EntryIterable<string, $ResultSubseqIterable<number>>>(
  $groupBy(Ø as (x: number) => $Promise<string>)(Ø as $Iterable<number>),
);

assert<$EntryIterable<string, $ResultSubseqIterable<number>>>(
  $groupBy(Ø as (x: number) => $Promise<string>, Ø as $Iterable<number>),
);
