import { GeneratorIterator } from '../../internal/iterable';

declare function entries<T = any>(
  obj: { [id: string]: T } | null | undefined,
): GeneratorIterator<[string, T]>;

export default entries;
