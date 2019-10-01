import { $Promise } from '../../../../generate/async.macro';
import assert from 'static-type-assert';
import { $size } from '../../..';

declare const Ø: never;

assert<$Promise<4>>($size(Ø as [0, 1, 2, 3]));
assert<$Promise<0 | 1 | 2>>($size(Ø as [] | [number] | [number, number]));
assert<$Promise<number>>($size(Ø as Array<number>));
assert<$Promise<number>>($size(Ø as string));
