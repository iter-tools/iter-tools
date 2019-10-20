import { $Promise } from '../../../../generate/async.macro';

import assert from 'static-type-assert';
import { $Iterable, $ResultIterable } from '../../../types/$iterable';
import { $groupBy } from '../../..';

declare const Ø: never;

assert<$ResultIterable<[string, $ResultIterable<number>]>>(
  $groupBy(Ø as (x: number) => $Promise<string>)(Ø as $Iterable<number>),
);

assert<$ResultIterable<[string, $ResultIterable<number>]>>(
  $groupBy(Ø as (x: number) => $Promise<string>, Ø as $Iterable<number>),
);
