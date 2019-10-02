import { $Promise } from '../../../generate/async.macro';

import { $SourceIterable, $Iterable } from '../../internal/$iterable';

declare function $first<Iter extends $SourceIterable<any>>(
  iterable: Iter,
): Iter extends [infer First, ...Array<any>]
  ? $Promise<First>
  : Iter extends $Iterable<infer T>
  ? $Promise<T | undefined>
  : $Promise<undefined>;

export default $first;
