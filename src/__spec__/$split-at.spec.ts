import assert from 'static-type-assert';

import { GeneratorIterator as SyncGeneratorIterator } from  '../internal/iterable';
import { $Iterable, $GeneratorIterator } from  '../internal/$iterable';
import { $splitAt } from '..';

declare var Ø: never;

assert<SyncGeneratorIterator<$GeneratorIterator<number>>>(
  $splitAt(3, Ø as $Iterable<number>),
);

assert<SyncGeneratorIterator<$GeneratorIterator<number>>>(
  $splitAt(3)(Ø as $Iterable<number>),
);
