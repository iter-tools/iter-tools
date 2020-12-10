import { $Promise } from '../../../../generate/async.macro.cjs';

import assert from 'static-type-assert';
import { $splitGroups } from 'iter-tools-es';
import { $Iterable, $IterableIterator } from '../../../types/$iterable';

declare const Ø: never;

assert<$IterableIterator<[string, $IterableIterator<number>]>>(
  $splitGroups(Ø as (x: number) => $Promise<string>)(Ø as $Iterable<number>),
);

assert<$IterableIterator<[string, $IterableIterator<number>]>>(
  $splitGroups(Ø as (x: number) => $Promise<string>, Ø as $Iterable<number>),
);

assert<$IterableIterator<[string, $IterableIterator<string>]>>($splitGroups(Ø as string));

assert<$IterableIterator<[number, $IterableIterator<number>]>>(
  $splitGroups(Ø as $Iterable<number>),
);
