import assert from 'static-type-assert';
import { permutations } from 'iter-tools-es';

declare const Ø: never;

assert<Iterable<[number, number, number]>>(permutations(3, Ø as Array<number>));

assert<Iterable<number[]>>(permutations(Number(), Ø as Array<number>));

assert<Iterable<number[]>>(permutations(999, Ø as Array<number>));

assert<Iterable<[string, string, string]>>(permutations(3, Ø as string));

assert<Iterable<[number, number, number, number]>>(
  permutations(Ø as [number, number, number, number]),
);

assert<Iterable<string[]>>(permutations(Ø as string));
