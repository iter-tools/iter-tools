import { $InputIterable, $IterableIterator } from './internal/$iterable';

declare function $splitLines(iterable: $InputIterable<string>): $IterableIterator<string>;

export default $splitLines;
