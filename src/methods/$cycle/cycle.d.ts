import { ResultIterable } from '../../internal/iterable';

import { SourceIterable } from '../../internal/iterable';

declare function cycle<T = any>(iterable: SourceIterable<T>): ResultIterable<T>;

export default cycle;
