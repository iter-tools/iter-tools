import { __method__ } from 'iter-tools-es';
import { wrap, unwrap } from '../../../test/helpers.js';

describe('__method__', () => {
  describe('when source is empty', () => {
    it('TODO: describe the result of mapping an empty source', () => {
      expect(unwrap(__method__(null))).toEqual([]);
      expect(unwrap(__method__(undefined))).toEqual([]);
      expect(unwrap(__method__(wrap([])))).toEqual([]);
    });
  });

  describe('when source has values', () => {
    it('TODO: describe result of mapping values', () => {
      expect(unwrap(__method__(wrap([1, 2, 3])))).toEqual([1, 2, 3]);
    });
  });
});
