import { Iterable, ResultIterable } from '../../types/iterable';

declare function entries<V>(
  obj: { [id: string]: V } | null | undefined,
): ResultIterable<[string, V]>;

export default entries;
