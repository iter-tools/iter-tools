import { Repeat } from 'typescript-tuple';

import { InRange8 } from './utility';

type CombinationsPermutationsByLength<T, R extends number> = Iterable<
  R extends InRange8 ? Repeat<T, R> : T[]
> & { readonly size: number };

type CombinationsPermutationsByIterable<Iter extends Iterable<any>> = Iter extends Iterable<infer T>
  ? Iter extends T[]
    ? CombinationsPermutationsByLength<T, Iter['length']>
    : (Iterable<T[]> & { size: number })
  : never;

/**
 * Function signature of `permutations` and `combinations`
 */
export interface CombinationsPermutations {
  <Iter extends Iterable<any>>(source: Iter): CombinationsPermutationsByIterable<Iter>;
  <T, R extends number>(r: R, source: Iterable<T>): CombinationsPermutationsByLength<T, R>;
}
