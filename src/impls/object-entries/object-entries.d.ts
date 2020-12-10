import { IterableIterator } from '../../types/iterable';

declare function objectEntries<V>(
  obj: { [id: string]: V } | null | undefined,
): IterableIterator<[string, V]>;

export { objectEntries };
