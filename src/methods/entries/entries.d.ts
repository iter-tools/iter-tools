import { Iterable, ResultIterable } from '../../types/iterable';

declare function entries<V>(
  entriesable: { [id: string]: V } | null | undefined,
): ResultIterable<[string, V]>;

declare function entries<K, V>(entriesable: {
  entries(): Iterable<[K, V]>;
}): ResultIterable<[K, V]>;

export default entries;
