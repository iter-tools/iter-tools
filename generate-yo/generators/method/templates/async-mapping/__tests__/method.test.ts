import { __method__ } from 'iter-tools-es';
import { asyncWrap, asyncUnwrap } from '../../../test/async-helpers.js';

describe('__method__', () => {
  describe('when source is empty', () => {
    it('TODO: describe result of mapping an empty source', async () => {
      expect(await asyncUnwrap(__method__(null))).toEqual([]);
      expect(await asyncUnwrap(__method__(undefined))).toEqual([]);
      expect(await asyncUnwrap(__method__(asyncWrap([])))).toEqual([]);
    });
  });

  describe('when source has values', () => {
    it('TODO: describe result of mapping values', async () => {
      expect(await asyncUnwrap(__method__(asyncWrap([1, 2, 3])))).toEqual([1, 2, 3]);
    });
  });
});
