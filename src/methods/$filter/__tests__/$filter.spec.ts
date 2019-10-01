import assert from 'static-type-assert';

import { $Iterable, $GeneratorIterator } from '../../../internal/$iterable';
import { $filter } from '../../..';

declare const Ø: never;

assert<$GeneratorIterator<string>>(
  $filter(Ø as (item: string | number) => item is string, Ø as $Iterable<string | number>),
);

assert<$GeneratorIterator<number>>(
  $filter(Ø as (item: string | number) => item is number, Ø as $Iterable<string | number>),
);

assert<$GeneratorIterator<0>>(
  $filter(Ø as (item: string | number) => item is 0, Ø as $Iterable<string | number>),
);
