import { IsFinite, Prepend, Reverse } from 'typescript-tuple';

import { SourceIterable } from '../../types/iterable';

/**
 * @example
 *   `ProductReturnElement<[string[], number[], boolean[]]>` is `[string, number, boolean]`
 */
type ProductReturnElement<Args extends Array<SourceIterable<any>>, Holder extends any[] = []> = {
  empty: Holder;
  many: ((...a: Reverse<Args>) => any) extends (a: infer Last, ...b: infer ReversedRest) => any
    ? ProductReturnElement<
        Reverse<ReversedRest>,
        Prepend<Holder, Last extends SourceIterable<infer T> ? T : never>
      >
    : never;
  infinite: Args extends Array<Array<infer T>> ? T[] : never;
}[Args extends [] ? 'empty' : IsFinite<Args, 'many', 'infinite'>];

declare function product<Args extends Array<SourceIterable<any>>>(
  ...iterables: Args
): IterableIterator<ProductReturnElement<Args>> & { size: number };

export { product };
