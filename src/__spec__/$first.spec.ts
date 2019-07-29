import assert from 'static-type-assert';

import { $Iterable, $Promise } from  '../internal/$iterable';
import { $first } from '..';

declare var Ø: never;

assert<$Promise<undefined>>($first(Ø as []));

assert<$Promise<0>>($first(Ø as [0, 1, 2, 3]));

assert<$Promise<number>>($first(Ø as [number, ...any[]]));

assert<$Promise<number | undefined>>($first(Ø as $Iterable<number>));

assert<$Promise<string | undefined>>($first(Ø as string));
