import { $IterableLike, $Promise } from './internal/$iterable';

declare function $size<Iter extends $IterableLike<any>>(
  iterable: Iter,
): $Promise<Iter extends any[] ? Iter['length'] : number>;

export default $size;
