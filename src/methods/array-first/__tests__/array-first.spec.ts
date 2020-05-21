import assert from 'static-type-assert';
import { arrayFirst } from '../../..';

declare const Ø: never;

assert<0>(arrayFirst(Ø as [0, 1, 2, 3]));

assert<number>(arrayFirst(Ø as [number, ...any[]]));
