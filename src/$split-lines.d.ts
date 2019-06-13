import { $IterableLike, $IterableIterator } from './internal/$iterable';

declare function $splitLines(iterable: $IterableLike<string>): $IterableIterator<string>;

export default $splitLines;
