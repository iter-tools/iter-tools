import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $splitWhen } from 'iter-tools-es';
import { $wrap, $unwrapDeep } from '../../../test/$helpers.js';

describe($`splitWhen`, () => {
  it(
    'should split between every value which is equal to the on argument',
    $async(() => {
      expect(
        $await($unwrapDeep($splitWhen((i) => i === null, $wrap([1, null, 2, null, 3])))),
      ).toEqual([[1], [2], [3]]);
    }),
  );

  it(
    'should return no parts if source is empty',
    $async(() => {
      expect($await($unwrapDeep($splitWhen((i) => i, null)))).toEqual([]);
    }),
  );
});
