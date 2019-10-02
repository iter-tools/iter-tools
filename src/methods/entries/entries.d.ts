import { ResultIterable } from '../../internal/iterable';

declare function entries<T = any>(
  obj: { [id: string]: T } | null | undefined,
): ResultIterable<[string, T]>;

export default entries;
