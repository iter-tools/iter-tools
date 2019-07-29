import { $InputIterable, $Iterable, $Promise } from './internal/$iterable';

declare function $firstOr<Iter extends $InputIterable<any>, E>(
  whenEmpty: E,
  iterable: Iter,
): Iter extends [infer First, ...Array<any>]
  ? $Promise<First>
  : Iter extends $Iterable<infer T>
  ? $Promise<T | E>
  : $Promise<E>;

export default $firstOr;
