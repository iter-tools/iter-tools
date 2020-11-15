import { $, $async, $await } from '../../../../generate/async.macro';

import { $zip, $toArray } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`zip`, () => {
  it(
    'zips',
    $async(() => {
      const iter = $zip($wrap([1, 2, 3]), $wrap([4, 5, 6]), $wrap([7, 8, 9]));
      expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
    }),
  );

  it(
    'zips stopping early',
    $async(() => {
      const iter = $zip($wrap([1, 2, 3]), $wrap([4, 5, 6]), $wrap([7, 8]));
      expect($await($toArray(iter))).toEqual([[1, 4, 7], [2, 5, 8]]);
    }),
  );
});
