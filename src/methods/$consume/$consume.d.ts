import { $Promise } from '../../../generate/async.macro';
import { $SourceIterable } from '../../internal/$iterable';

declare function $consume<T = any>(
  func: (item: T, i: number) => void,
): (iterable: $SourceIterable<T>) => $Promise<void>;

declare function $consume<T = any>(
  func: (item: T, i: number) => void,
  iterable: $SourceIterable<T>,
): $Promise<void>;

export default $consume;
