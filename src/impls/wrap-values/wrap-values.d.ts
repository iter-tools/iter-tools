import { Iterable, ResultIterable } from '../../types/iterable';

declare function wrapValues<V>(
  valuesable: { values(): Iterable<V> } | null | undefined,
): ResultIterable<V>;

export { wrapValues };
