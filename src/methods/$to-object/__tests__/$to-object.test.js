import { $, $async, $await } from '../../../../generate/async.macro';

import { $toObject } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`toObject`, () => {
  it(
    'turns an iterable into an object',
    $async(() => {
      expect($await($toObject($wrap([['foo', 'fox'], ['bar', 'box'], ['baz', 'rox']])))).toEqual({
        foo: 'fox',
        bar: 'box',
        baz: 'rox',
      });
    }),
  );
});
