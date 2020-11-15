import { $, $async, $await } from '../../../../generate/async.macro';

import { $toArray } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`toArray`, () => {
  it(
    'turns an iterable into an array',
    $async(() => {
      expect($await($toArray($wrap([1, 2, 3])))).toEqual([1, 2, 3]);
    }),
  );
});
