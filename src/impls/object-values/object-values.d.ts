import { IterableIterator } from '../../types/iterable';

declare function objectValues<V>(obj: { [id: string]: V } | null | undefined): IterableIterator<V>;

export { objectValues };
