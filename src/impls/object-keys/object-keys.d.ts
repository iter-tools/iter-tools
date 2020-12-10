import { IterableIterator } from '../../types/iterable';

declare function objectKeys(
  obj: { [id: string]: any } | null | undefined,
): IterableIterator<string>;

export { objectKeys };
