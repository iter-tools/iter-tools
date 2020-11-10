import { $, $async, $await } from '../../../../generate/async.macro';

import { $str } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

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
      const iterable: any = [1, 2, 3];
      iterable;
      expect($await($str($wrap(iterable)))).toEqual('123');
    }),
  );
});
