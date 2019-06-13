import assert from 'static-type-assert';
import { combinations } from '..';

declare var Ø: never;

assert<Iterable<[number, number, number]>>(combinations(3, Ø as Array<number>));

assert<number>(combinations(3, Ø as Array<number>).getSize());

assert<Iterable<number[]>>(combinations(Ø as number, Ø as Array<number>));

assert<Iterable<number[]>>(combinations(Ø as 999, Ø as Array<number>));

assert<Iterable<[string, string, string]>>(combinations(3, Ø as string));

assert<Iterable<[number, number, number, number]>>(
  combinations(Ø as [number, number, number, number]),
);

assert<Iterable<string[]>>(combinations(Ø as string));
