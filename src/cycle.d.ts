import { GeneratorIterator } from './internal/iterable';

import { InputIterable } from './internal/iterable';

declare function cycle<T = any>(iterable: InputIterable<T>): GeneratorIterator<T>;

export default cycle;
