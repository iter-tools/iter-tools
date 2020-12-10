import { Repeat } from 'typescript-tuple';

import { InRange8 } from './utility';
import { Wrappable } from '../../types/iterable';

type CombinationsPermutationsByLength<T, R extends number> = Wrappable<
  R extends InRange8 ? Repeat<T, R> : T[]
> & { readonly size: number };

type CombinationsPermutationsByIterable<Iter extends Wrappable<any>> = Iter extends Wrappable<
  infer T
>
  ? Iter extends T[]
    ? CombinationsPermutationsByLength<T, Iter['length']>
    : Iterable<T[]> & { size: number }
  : never;

/**
 * Function signature of `permutations` and `combinations`
 */
export interface CombinationsPermutations {
  <Iter extends Wrappable<any>>(source: Iter): CombinationsPermutationsByIterable<Iter>;
  <T, R extends number>(r: R, source: Wrappable<T>): CombinationsPermutationsByLength<T, R>;
}
