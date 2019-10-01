import assert from 'static-type-assert';
import { compose, map, filter } from '../../..';

declare const Ø: never;

const func = compose<Iterable<number>>(
  filter(x => {
    assert<number>(x);
    return x % 2 === 1;
  }),
  map(x => {
    assert<number>(x);
    return x + 2;
  }),
);

assert<(iter: Iterable<number>) => Iterable<number>>(func);

assert<Iterable<number>>(func(Ø as Array<number>));
