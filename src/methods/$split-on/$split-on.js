import { $isSync } from '../../../generate/async.macro';

import { $iterableCurry } from '../../internal/$iterable';
import { $splitWith } from '../$split-with/$split-with';

export function $splitOn(source, separator) {
  return $splitWith(source, (value) => value === separator);
}

export default $iterableCurry($splitOn, {
  validateArgs(args) {
    if ($isSync && typeof args[1] === 'string') {
      console.warn(`For string inputs use splitOnSeq instead of splitOn`);
    }
  },
});
