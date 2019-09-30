import { $Promise } from '../../../generate/async.macro';

import { $InputIterable } from '../../internal/$iterable';

declare function $size<Iter extends $InputIterable<any>>(
  iterable: Iter,
): $Promise<Iter extends any[] ? Iter['length'] : number>;

export default $size;
