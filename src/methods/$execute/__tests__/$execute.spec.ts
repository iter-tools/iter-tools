import assert from 'static-type-assert';

import { $GeneratorIterator } from '../../../internal/$iterable';
import { $execute } from '../../..';

declare const Ø: never;

assert<$GeneratorIterator<123>>($execute(Ø as () => 123));

assert<$GeneratorIterator<123>>(
  $execute(Ø as <T>(x: T, ...args: Array<unknown>) => T, Ø as 123, Ø as 456),
);

assert<$GeneratorIterator<[]>>($execute((...args) => args));

assert<$GeneratorIterator<[0, 1, 2]>>($execute((...args) => args, Ø as 0, Ø as 1, Ø as 2));
