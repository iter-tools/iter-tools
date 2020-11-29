import assert from 'static-type-assert';

import { $Iterable, $ResultIterable } from '../../../types/$iterable';
import { $filter } from '@iter-tools/es';

declare const Ø: never;

assert<$ResultIterable<string>>(
  $filter(Ø as (value: string | number) => value is string, Ø as $Iterable<string | number>),
);

assert<$ResultIterable<number>>(
  $filter(Ø as (value: string | number) => value is number, Ø as $Iterable<string | number>),
);

assert<$ResultIterable<0>>(
  $filter(Ø as (value: string | number) => value is 0, Ø as $Iterable<string | number>),
);

assert<$ResultIterable<string | number>>(
  $filter(
    Ø as (value: string | number) => boolean,
    Ø as $Iterable<string | number> | null | undefined,
  ),
);
