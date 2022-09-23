import { firstHighest } from 'iter-tools-es';

describe('firstHighest', () => {
  describe('when best is greater than value', () => {
    it('returns false', () => {
      expect(firstHighest(1, 0)).toEqual(false);
    });
  });

  describe('when value is greater than best', () => {
    it('returns true', () => {
      expect(firstHighest(0, 1)).toEqual(true);
    });
  });

  describe('when value is best', () => {
    it('returns false', () => {
      expect(firstHighest(0, 0)).toEqual(false);
    });
  });
});
