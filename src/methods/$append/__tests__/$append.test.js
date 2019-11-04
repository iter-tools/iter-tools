import { $, $async, $await } from '../../../../generate/async.macro';

import { $append, $toArray, $wrap } from '../../..';

describe($`append`, () => {
  it(
    'appends a value',
    $async(() => {
      expect($await($toArray($append(3, $wrap([1, 2]))))).toEqual([1, 2, 3]);
    }),
  );
});
