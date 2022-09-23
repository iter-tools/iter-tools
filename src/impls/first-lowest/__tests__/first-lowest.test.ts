import { firstLowest } from 'iter-tools-es';

describe('firstLowest', () => {
  describe('when best is smaller than value', () => {
    it('returns true', () => {
      expect(firstLowest(1, 0)).toEqual(true);
    });
  });

  describe('when value is smaller than best', () => {
    it('returns false', () => {
      expect(firstLowest(0, 1)).toEqual(false);
    });
  });

  describe('when value is best', () => {
    it('returns false', () => {
      expect(firstLowest(0, 0)).toEqual(false);
    });
  });
});
