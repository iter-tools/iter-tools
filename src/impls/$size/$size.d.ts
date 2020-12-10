import { $Promise } from '../../../generate/async.macro.cjs';

import { $Wrappable } from '../../types/$iterable';

declare function $size<Iter extends $Wrappable<any>>(
  iterable: Iter,
): $Promise<Iter extends any[] ? Iter['length'] : number>;

export { $size };
