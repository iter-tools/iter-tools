import { cloneRegexp, isRegExp } from '../regexp';

describe('cloneRegexp', () => {
  it('clones', () => {
    const clone = cloneRegexp(/abc/i, { global: true });
    expect(clone.source).toBe('abc');
    expect(clone.global).toBe(true);
    expect(clone.ignoreCase).toBe(true);
    expect(clone.multiline).toBe(false);
  });
});

describe('isRegExp', () => {
  it('detects a regexp', () => {
    expect(isRegExp(/a/)).toBe(true);
    expect(isRegExp(new RegExp('a'))).toBe(true);
  });

  it('detects if it is not a re', () => {
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp(1)).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp([])).toBe(false);
  });
});
