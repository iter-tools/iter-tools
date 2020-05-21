import { __method__, asyncToArray } from '../../..';
import { asyncWrap } from '../../../__tests__/__framework__/async-wrap';

describe('__method__', () => {
  it(
    'TODO: replace this test',
    async () => {
      expect(await asyncToArray(__method__(asyncWrap([1, 2, 3])))).toEqual([1, 2, 3]);
    },
  );
});
