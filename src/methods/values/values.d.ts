import { ResultIterable } from '../../types/iterable';

declare function values<V>(obj: { [id: string]: V } | null | undefined): ResultIterable<V>;

export default values;
