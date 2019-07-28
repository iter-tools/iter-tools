import { $InputIterable, $Promise } from './internal/$iterable';

declare function $size<Iter extends $InputIterable<any>>(
  iterable: Iter,
): $Promise<Iter extends any[] ? Iter['length'] : number>;

export default $size;
