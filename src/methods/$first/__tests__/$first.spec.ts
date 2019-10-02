import { $Promise } from '../../../../generate/async.macro';

import assert from 'static-type-assert';
import { $Iterable } from '../../../types/$iterable';
import { $first } from '../../..';

declare const Ø: never;

assert<$Promise<undefined>>($first(Ø as []));

assert<$Promise<0>>($first(Ø as [0, 1, 2, 3]));

assert<$Promise<number>>($first(Ø as [number, ...any[]]));

assert<$Promise<number | undefined>>($first(Ø as $Iterable<number>));

assert<$Promise<string | undefined>>($first(Ø as string));
