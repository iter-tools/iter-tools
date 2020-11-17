import { range } from '@iter-tools/es';
import { anyType, unwrap } from '../../../test/helpers.js';

describe('range', () => {
  describe('when no arguments are passed', () => {
    it('yields incrementing integers starting with 0', () => {
      const [a, b, c] = range();
      expect([a, b, c]).toEqual([0, 1, 2]);

      const [d, e, f] = range({});
      expect([d, e, f]).toEqual([0, 1, 2]);
    });
  });

  describe('when end is passed', () => {
    it('yields incrementing integers from 0 to end', () => {
      expect(unwrap(range(3))).toEqual([0, 1, 2]);
      expect(unwrap(range({ end: 3 }))).toEqual([0, 1, 2]);
    });
  });

  describe('when start and end are passed', () => {
    it('yields incrementing integers from start to end', () => {
      expect(unwrap(range(1, 4))).toEqual([1, 2, 3]);
      expect(unwrap(range({ start: 1, end: 4 }))).toEqual([1, 2, 3]);
    });
  });

  describe('when start, end, and step are passed', () => {
    it('yields integers from start to end incrementing by step', () => {
      expect(unwrap(range(1, 7, 2))).toEqual([1, 3, 5]);
      expect(unwrap(range(1, 6, 2))).toEqual([1, 3, 5]);
      expect(unwrap(range({ start: 1, end: 6, step: 2 }))).toEqual([1, 3, 5]);
    });
  });

  describe('when options are invalid', () => {
    it('throws', () => {
      expect(() => range({ start: anyType('foo') })).toThrowErrorMatchingSnapshot();

      expect(() => range({ end: anyType(null) })).toThrowErrorMatchingSnapshot();

      expect(() => range({ step: anyType(Infinity) })).toThrowErrorMatchingSnapshot();
    });
  });
});
