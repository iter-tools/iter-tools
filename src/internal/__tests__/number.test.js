import { isInteger, isIntegerOrInfinite } from '../number.js';

describe('isInteger', () => {
  describe('when value is an integer', () => {
    it('returns true', () => {
      expect(isInteger(1)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(-1)).toBe(true);
    });
  });

  describe('when value is not an integer', () => {
    it('returns false', () => {
      expect(isInteger(NaN)).toBe(false);
      expect(isInteger(-Infinity)).toBe(false);
      expect(isInteger(null)).toBe(false);
      expect(isInteger(undefined)).toBe(false);
    });
  });

  describe('when nonZero argument is true', () => {
    describe('when value is a non-zero integer', () => {
      it('returns true', () => {
        expect(isInteger(1, true)).toBe(true);
      });
    });

    describe('when value is a zero integer', () => {
      it('returns true', () => {
        expect(isInteger(0, true)).toBe(false);
      });
    });
  });
});

describe('isIntegerOrInfinite', () => {
  describe('when value is an integer', () => {
    it('returns true', () => {
      expect(isIntegerOrInfinite(1)).toBe(true);
      expect(isIntegerOrInfinite(0)).toBe(true);
      expect(isIntegerOrInfinite(-1)).toBe(true);
    });
  });

  describe('when value is infinite', () => {
    it('returns true', () => {
      expect(isIntegerOrInfinite(Infinity)).toBe(true);
      expect(isIntegerOrInfinite(-Infinity)).toBe(true);
    });
  });

  describe('when value is not an integer', () => {
    it('returns false', () => {
      expect(isIntegerOrInfinite(NaN)).toBe(false);
      expect(isIntegerOrInfinite(null)).toBe(false);
      expect(isIntegerOrInfinite(undefined)).toBe(false);
    });
  });

  describe('when nonZero argument is true', () => {
    describe('when value is a non-zero integer', () => {
      it('returns true', () => {
        expect(isIntegerOrInfinite(1, true)).toBe(true);
      });
    });

    describe('when value is a zero integer', () => {
      it('returns true', () => {
        expect(isIntegerOrInfinite(0, true)).toBe(false);
      });
    });
  });
});
