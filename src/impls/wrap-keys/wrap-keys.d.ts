import { Iterable, IterableIterator } from '../../types/iterable';

declare function wrapKeys<K>(
  keysable: { keys(): Iterable<K> } | null | undefined,
): IterableIterator<K>;

export { wrapKeys };
