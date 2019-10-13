import { ResultIterable } from '../../types/iterable';

import { SourceIterable } from '../../types/iterable';

declare function cycle<T = any>(n: number, iterable: SourceIterable<T>): ResultIterable<T>;

declare function cycle<T = any>(n: number): (iterable: SourceIterable<T>) => ResultIterable<T>;

declare function cycle<T = any>(iterable: SourceIterable<T>): ResultIterable<T>;

export default cycle;
