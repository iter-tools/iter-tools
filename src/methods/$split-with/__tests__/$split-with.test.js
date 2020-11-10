import { $, $async, $await } from '../../../../generate/async.macro';

import { $splitWith } from '../../..';
import { $unwrapDeep as $uw } from '../../../__tests__/$helpers';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`splitWith`, () => {
  it(
    'should split between every item which is equal to the on argument',
    $async(() => {
      expect($await($uw($splitWith(i => i === null, $wrap([1, null, 2, null, 3]))))).toEqual([
        [1],
        [2],
        [3],
      ]);
    }),
  );

  it(
    'should return no parts if source is empty',
    $async(() => {
      expect($await($uw($splitWith(i => i, null)))).toEqual([]);
    }),
  );
});
