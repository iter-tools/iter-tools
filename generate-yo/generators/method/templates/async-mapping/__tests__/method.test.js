import { __method__ } from '@iter-tools/es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('__method__', () => {
  it(
    'TODO: replace this test',
    async () => {
      expect(await asyncUnwrap(__method__(asyncWrap([1, 2, 3])))).toEqual([1, 2, 3]);
    },
  );
});
