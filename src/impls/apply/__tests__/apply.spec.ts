import assert from 'static-type-assert';
import { apply } from 'iter-tools-es';

declare const Ø: never;

declare function add(a: number, b: number): number;

assert<number>(apply(add, Ø as Array<number>));
assert<number>(apply(add, Ø as Iterable<number>));
