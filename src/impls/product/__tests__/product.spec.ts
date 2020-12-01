import assert from 'static-type-assert';
import { product } from 'iter-tools-es';

declare const Ø: never;

assert<Iterable<[0 | 1 | 2, 3 | 4 | 5]>>(product(Ø as [0, 1, 2], Ø as [3, 4, 5]));

assert<Iterable<[number, number, number]>>(
  product(Ø as Array<number>, Ø as Array<number>, Ø as Array<number>),
);

assert<number>(product(Ø as Array<number>, Ø as Array<number>, Ø as Array<number>).size);

assert<Iterable<[string, string, string]>>(product(Ø as string, Ø as string, Ø as string));
