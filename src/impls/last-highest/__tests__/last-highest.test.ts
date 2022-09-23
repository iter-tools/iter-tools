import { lastHighest } from 'iter-tools-es';

describe('lastHighest', () => {
  describe('when best is greater than value', () => {
    it('returns false', () => {
      expect(lastHighest(1, 0)).toEqual(false);
    });
  });

  describe('when value is greater than best', () => {
    it('returns true', () => {
      expect(lastHighest(0, 1)).toEqual(true);
    });
  });

  describe('when value is best', () => {
    it('returns true', () => {
      expect(lastHighest(0, 0)).toEqual(true);
    });
  });
});
