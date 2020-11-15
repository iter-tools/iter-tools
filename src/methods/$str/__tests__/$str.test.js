import { $, $async, $await } from '../../../../generate/async.macro';

import { $str } from '../../..';
import { $wrap } from '../../../test/$helpers';

describe($`str`, () => {
  it(
    'joins an iterable of strings into a single string',
    $async(() => {
      expect($await($str($wrap(['1', '2', '3'])))).toEqual('123');
    }),
  );

  it(
    'coerces non-strings into strings',
    $async(() => {
      expect($await($str($wrap([1, 2, 3])))).toEqual('123');
    }),
  );
});
