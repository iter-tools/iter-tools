import { Repeat } from 'typescript-tuple';

import { InRange8 } from './utility';
import { SourceIterable } from '../../types/iterable';

type CombinationsPermutationsByLength<T, R extends number> = SourceIterable<
  R extends InRange8 ? Repeat<T, R> : T[]
> & { readonly size: number };

type CombinationsPermutationsByIterable<
  Iter extends SourceIterable<any>
> = Iter extends SourceIterable<infer T>
  ? Iter extends T[]
    ? CombinationsPermutationsByLength<T, Iter['length']>
    : Iterable<T[]> & { size: number }
  : never;

/**
 * Function signature of `permutations` and `combinations`
 */
export interface CombinationsPermutations {
  <Iter extends SourceIterable<any>>(source: Iter): CombinationsPermutationsByIterable<Iter>;
  <T, R extends number>(r: R, source: SourceIterable<T>): CombinationsPermutationsByLength<T, R>;
}
