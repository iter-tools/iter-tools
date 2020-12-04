import { Iterable, ResultIterable } from '../../types/iterable';

declare function wrapKeys<K>(
  keysable: { keys(): Iterable<K> } | null | undefined,
): ResultIterable<K>;

export { wrapKeys };
