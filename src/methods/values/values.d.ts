import { Iterable, ResultIterable } from '../../types/iterable';

declare function values<V>(valuesable: { [id: string]: V } | null | undefined): ResultIterable<V>;

declare function values<V>(valuesable: { values(): Iterable<V> }): ResultIterable<V>;

export default values;
