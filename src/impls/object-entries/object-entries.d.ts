import { ResultIterable } from '../../types/iterable';

declare function objectEntries<V>(
  obj: { [id: string]: V } | null | undefined,
): ResultIterable<[string, V]>;

export { objectEntries };
