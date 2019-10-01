import { $Promise } from '../../../../generate/async.macro';

import assert from 'static-type-assert';
import { $Iterable } from '../../../internal/$iterable';
import { $firstOr } from '../../..';

declare const Ø: never;

assert<$Promise<null>>($firstOr(Ø as null, Ø as []));

assert<$Promise<0>>($firstOr(Ø as null, Ø as [0, 1, 2, 3]));

assert<$Promise<number>>($firstOr(Ø as null, Ø as [number, ...any[]]));

assert<$Promise<number | null>>($firstOr(Ø as null, Ø as $Iterable<number>));

assert<$Promise<string | null>>($firstOr(Ø as null, Ø as string));
