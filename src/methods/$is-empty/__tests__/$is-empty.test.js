import { $, $async, $await } from '../../../../generate/async.macro';

import { $isEmpty } from '../../..';
import { $wrap } from '../../../__tests__/__framework__/$wrap';

describe($`isEmpty`, () => {
  describe('when iterable is empty', () => {
    it(
      'returns true',
      $async(() => {
        expect($await($isEmpty(null))).toBe(true);
        expect($await($isEmpty(undefined))).toBe(true);
        expect($await($isEmpty($wrap([])))).toBe(true);
      }),
    );
  });

  describe('when iterable contains values', () => {
    it(
      'returns false',
      $async(() => {
        expect($await($isEmpty($wrap([1, 2, 3])))).toBe(false);
      }),
    );
  });
});
