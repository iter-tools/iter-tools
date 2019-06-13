import assert from 'static-type-assert';
import { size } from '..';

declare var Ø: never;

assert<4>(size(Ø as [0, 1, 2, 3]));
assert<0 | 1 | 2>(size(Ø as [] | [number] | [number, number]));
assert<number>(size(Ø as Array<number>));
assert<number>(size(Ø as string));
