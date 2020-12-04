import { Iterable, ResultIterable } from '../../types/iterable';

declare function wrapEntries<K, V>(
  entriesable:
    | {
        entries(): Iterable<[K, V]>;
      }
    | null
    | undefined,
): ResultIterable<[K, V]>;

export { wrapEntries };
