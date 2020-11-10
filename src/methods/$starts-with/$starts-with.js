import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $startsWithAny } from '../$starts-with-any/$starts-with-any';

export function $startsWith(iterable, values) {
  return $startsWithAny(iterable, [values]);
}

export default $iterableCurry($startsWith, {
  reduces: true,
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn('For string inputs use startsWithSubseq instead of startsWith');
    }
  },
});
