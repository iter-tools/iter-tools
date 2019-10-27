import { $Promise } from '../../../generate/async.macro';
import { $SourceIterable } from '../../types/$iterable';

declare function $forEach<T>(
  callback: (item: T, i: number) => void,
): (iterable: $SourceIterable<T>) => $Promise<void>;

declare function $forEach<T>(
  callback: (item: T, i: number) => void,
  iterable: $SourceIterable<T>,
): $Promise<void>;

export default $forEach;
