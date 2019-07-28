import assert from 'static-type-assert';
import { GeneratorIterator } from '../internal/iterable';
import { execPipe, map, filter } from '..';

declare var Ø: never;

assert<GeneratorIterator<number>>(
  execPipe(
    Ø as Iterable<number>,
    filter(Ø as (x: number) => boolean),
    map(Ø as (x: number) => number),
  ),
);

assert<GeneratorIterator<0 | 1 | 2 | 3>>(
  execPipe(
    Ø as Iterable<number>,
    filter(Ø as (x: number) => boolean),
    map(Ø as (x: number) => number),
    filter(Ø as (x: number) => x is 0 | 1 | 2 | 3),
  ),
);

assert<4>(
  execPipe(
    Ø as 0,
    Ø as (x: 0) => 1,
    Ø as (x: 1) => 2,
    Ø as (x: 2) => 3,
    Ø as (x: 3) => 4,
  ),
);
