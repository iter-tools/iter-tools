import assert from 'static-type-assert';

import { $Iterable, $GeneratorIterator, $Promise } from  '../../../internal/$iterable';
import { $groupBy } from '../../..';

declare var Ø: never;

assert<$GeneratorIterator<[string, $GeneratorIterator<string>]>>(
  $groupBy(null)(Ø as string),
);

assert<$GeneratorIterator<[number, $GeneratorIterator<number>]>>(
  $groupBy(null)(Ø as $Iterable<number>),
);

assert<$GeneratorIterator<[string, $GeneratorIterator<string>]>>(
  $groupBy(null, Ø as string),
);

assert<$GeneratorIterator<[number, $GeneratorIterator<number>]>>(
  $groupBy(null, Ø as $Iterable<number>),
);

assert<$GeneratorIterator<[string, $GeneratorIterator<number>]>>(
  $groupBy(Ø as (x: number) => $Promise<string>)(Ø as $Iterable<number>),
);

assert<$GeneratorIterator<[string, $GeneratorIterator<number>]>>(
  $groupBy(Ø as (x: number) => $Promise<string>, Ø as $Iterable<number>),
);
