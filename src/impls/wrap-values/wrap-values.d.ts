import { Iterable, IterableIterator } from '../../types/iterable';

declare function wrapValues<V>(
  valuesable: { values(): Iterable<V> } | null | undefined,
): IterableIterator<V>;

export { wrapValues };
