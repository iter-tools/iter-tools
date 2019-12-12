import { ResultIterable } from '../../types/iterable';

declare function objectValues<V>(obj: { [id: string]: V } | null | undefined): ResultIterable<V>;

export default objectValues;
