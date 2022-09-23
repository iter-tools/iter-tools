import { lastLowest } from 'iter-tools-es';

describe('lastLowest', () => {
  describe('when best is smaller than value', () => {
    it('returns true', () => {
      expect(lastLowest(1, 0)).toEqual(true);
    });
  });

  describe('when value is smaller than best', () => {
    it('returns false', () => {
      expect(lastLowest(0, 1)).toEqual(false);
    });
  });

  describe('when value is best', () => {
    it('returns false', () => {
      expect(lastLowest(0, 0)).toEqual(true);
    });
  });
});
