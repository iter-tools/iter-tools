import { $Promise } from '../../../generate/async.macro';
import { $InputIterable, $Iterable } from '../../internal/$iterable';

declare function $firstOr<Iter extends $InputIterable<any>, E>(
  whenEmpty: E,
  iterable: Iter,
): Iter extends [infer First, ...Array<any>]
  ? $Promise<First>
  : Iter extends $Iterable<infer T>
  ? $Promise<T | E>
  : $Promise<E>;

export default $firstOr;
