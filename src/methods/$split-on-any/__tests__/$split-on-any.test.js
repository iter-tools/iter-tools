import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitOnAny } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`splitOnAny`, () => {
  it(
    'should split on an occurance of any value',
    $async(() => {
      expect($await($uw($splitOnAny([null, undefined], $wrap([1, null, undefined, 3]))))).toEqual([
        [1],
        [],
        [3],
      ]);
    }),
  );

  it(
    'does not split when passed no values',
    $async(() => {
      expect($await($uw($splitOnAny([], $wrap([1, 2, 3]))))).toEqual([[1, 2, 3]]);
    }),
  );

  it(
    'passes through the empty iterable',
    $async(() => {
      expect($await($uw($splitOnAny([], null)))).toEqual([]);
    }),
  );
});
