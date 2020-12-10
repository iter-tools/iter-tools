import { Iterable, IterableIterator } from '../../types/iterable';

declare function wrapEntries<K, V>(
  entriesable:
    | {
        entries(): Iterable<[K, V]>;
      }
    | null
    | undefined,
): IterableIterator<[K, V]>;

export { wrapEntries };
