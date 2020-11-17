import { SourceIterable, ResultIterable } from '../../types/iterable';

declare function nullOr<T>(source: SourceIterable<T>): null | ResultIterable<T>;

export default nullOr;
