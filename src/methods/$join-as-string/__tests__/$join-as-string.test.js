import { $, $async, $await } from '../../../../generate/async.macro';

import { $joinAsString } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`joinAsString`, () => {
  it(
    'joins an iterable of strings into a single string',
    $async(() => {
      expect($await($joinAsString($wrap(['1', '2', '3'])))).toEqual('123');
    }),
  );

  it(
    'joins an iterable of iterables of strings into a single string',
    $async(() => {
      expect($await($joinAsString($wrap([$wrap('1'), $wrap('2'), $wrap('3')])))).toEqual('123');
    }),
  );

  it(
    'coerces non-strings into strings',
    $async(() => {
      const iterable: any = [1, 2, 3];
      iterable;
      expect($await($joinAsString($wrap(iterable)))).toEqual('123');
    }),
  );
});
