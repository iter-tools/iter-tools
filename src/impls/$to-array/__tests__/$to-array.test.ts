import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $toArray } from 'iter-tools-es';
import { $wrap } from '../../../test/$helpers.js';

describe($`toArray`, () => {
  it(
    'turns an iterable into an array',
    $async(() => {
      expect($await($toArray($wrap([1, 2, 3])))).toEqual([1, 2, 3]);
    }),
  );
});
