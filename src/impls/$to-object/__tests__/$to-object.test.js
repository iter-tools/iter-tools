import { $, $async, $await } from '../../../../generate/async.macro.cjs';

import { $toObject } from '@iter-tools/es';
import { $wrap } from '../../../test/$helpers.js';

describe($`toObject`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns an empty object',
      $async(() => {
        expect($await($toObject(null))).toEqual({});
        expect($await($toObject(undefined))).toEqual({});
        expect($await($toObject($wrap([])))).toEqual({});
      }),
    );
  });

  describe('given an iterable of entries', () => {
    it(
      'returns the object with those entries',
      $async(() => {
        const entries: Array<[string, string]> = [
          ['foo', 'fox'],
          ['bar', 'box'],
          ['baz', 'rox'],
        ];
        entries;
        expect($await($toObject($wrap(entries)))).toEqual({
          foo: 'fox',
          bar: 'box',
          baz: 'rox',
        });
      }),
    );
  });

  it(
    'can take a prototype to pass to Object.create',
    $async(() => {
      expect(Object.getPrototypeOf($await($toObject($wrap([]), null)))).toEqual(null);
    }),
  );
});
