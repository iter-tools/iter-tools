import { $Promise } from '../../../generate/async.macro.cjs';

import { $SourceIterable } from '../../types/$iterable';

declare function $size<Iter extends $SourceIterable<any>>(
  iterable: Iter,
): $Promise<Iter extends any[] ? Iter['length'] : number>;

export { $size };
