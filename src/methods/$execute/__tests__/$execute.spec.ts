import assert from 'static-type-assert';

import { $ResultIterable } from '../../../types/$iterable';
import { $execute } from '../../..';

declare const Ø: never;

assert<$ResultIterable<123>>($execute(Ø as () => 123));

assert<$ResultIterable<123>>(
  $execute(Ø as <T>(x: T, ...args: Array<unknown>) => T, Ø as 123, Ø as 456),
);

assert<$ResultIterable<[]>>($execute((...args) => args));

assert<$ResultIterable<[0, 1, 2]>>($execute((...args) => args, Ø as 0, Ø as 1, Ø as 2));
