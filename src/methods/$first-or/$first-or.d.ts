import { $Promise } from '../../../generate/async.macro';
import { $SourceIterable, $Iterable } from '../../types/$iterable';

declare function $firstOr<Iter extends $SourceIterable<any>, E>(
  whenEmpty: E,
  iterable: Iter,
): Iter extends [infer First, ...Array<any>]
  ? $Promise<First>
  : Iter extends $Iterable<infer T>
  ? $Promise<T | E>
  : $Promise<E>;

export default $firstOr;
