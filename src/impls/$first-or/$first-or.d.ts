import { $Promise } from '../../../generate/async.macro.cjs';
import { $SourceIterable } from '../../types/$iterable';

declare function $firstOr<E, T>(whenEmpty: E, iterable: $SourceIterable<T>): $Promise<T | E>;

export default $firstOr;
