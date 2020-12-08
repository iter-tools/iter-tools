import { $Promise } from '../../../../generate/async.macro.cjs';

import assert from 'static-type-assert';
import { $Iterable, $ResultIterable } from '../../../types/$iterable';
import { $splitGroupsBy } from 'iter-tools-es';

declare const Ø: never;

assert<$ResultIterable<[string, $ResultIterable<number>]>>(
  $splitGroupsBy(Ø as (x: number) => $Promise<string>)(Ø as $Iterable<number>),
);

assert<$ResultIterable<[string, $ResultIterable<number>]>>(
  $splitGroupsBy(Ø as (x: number) => $Promise<string>, Ø as $Iterable<number>),
);
