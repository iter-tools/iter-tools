import { SourceIterable } from '../../types/iterable';

declare function arrayFrom<T>(source: SourceIterable<T>): Array<T>;

export default arrayFrom;
