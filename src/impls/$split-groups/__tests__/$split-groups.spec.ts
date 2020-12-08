import { $Promise } from '../../../../generate/async.macro.cjs';

import assert from 'static-type-assert';
import { $splitGroups } from 'iter-tools-es';
import { $Iterable, $ResultIterable } from '../../../types/$iterable';

declare const Ø: never;

assert<$ResultIterable<[string, $ResultIterable<number>]>>(
  $splitGroups(Ø as (x: number) => $Promise<string>)(Ø as $Iterable<number>),
);

assert<$ResultIterable<[string, $ResultIterable<number>]>>(
  $splitGroups(Ø as (x: number) => $Promise<string>, Ø as $Iterable<number>),
);

assert<$ResultIterable<[string, $ResultIterable<string>]>>($splitGroups(Ø as string));

assert<$ResultIterable<[number, $ResultIterable<number>]>>($splitGroups(Ø as $Iterable<number>));
