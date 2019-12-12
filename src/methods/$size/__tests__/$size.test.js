import { $, $async, $await } from '../../../../generate/async.macro';

import { $size } from '../../..';
import { $range } from '../../../__tests__/$range';

describe($`size`, () => {
  it(
    'return number of items in iterable',
    $async(() => {
      expect($await($size($range(1, 7)))).toBe(6);
    }),
  );

  it(
    'returns 0 for null or undefined',
    $async(() => {
      expect($await($size(null))).toBe(0);
      expect($await($size(undefined))).toBe(0);
    }),
  );
});
