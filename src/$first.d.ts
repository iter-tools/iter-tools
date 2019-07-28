import { $InputIterable, $Iterable, $Promise } from './internal/$iterable';

declare function $first<Iter extends $InputIterable<any>>(
  iterable: Iter,
): Iter extends [infer First, ...Array<any>]
  ? $Promise<First>
  : Iter extends $Iterable<infer T>
  ? $Promise<T | undefined>
  : $Promise<undefined>;

export default $first;
